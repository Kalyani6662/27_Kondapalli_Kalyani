from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from math import sqrt
import pdfplumber
import os
import sqlite3
import pickle
from dotenv import load_dotenv
from openai import OpenAI, OpenAIError

# ---------------- ENV ----------------
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# ---------------- APP ----------------
app = FastAPI(title="SEC AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- DATABASE ----------------
conn = sqlite3.connect("sec_ai.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS filings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    content TEXT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS summaries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file_id INTEGER,
    text TEXT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS embeddings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file_id INTEGER,
    text TEXT,
    vector BLOB
)
""")

conn.commit()

# ---------------- UTILS ----------------
def chunk_text(text, size=1200):
    return [text[i:i + size] for i in range(0, len(text), size)]

def cosine_similarity(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    mag_a = sqrt(sum(x * x for x in a))
    mag_b = sqrt(sum(x * x for x in b))
    if mag_a == 0 or mag_b == 0:
        return 0
    return dot / (mag_a * mag_b)

def extract_output_text(response):
    try:
        return response.output[0].content[0].text
    except Exception:
        return ""

# ---------------- ROUTES ----------------
@app.get("/")
def home():
    return {"message": "SEC AI Backend Running 🚀"}

# ---------- UPLOAD ----------
@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    with pdfplumber.open(file.file) as pdf:
        text = ""
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"

    if not text.strip():
        return {"error": "No readable text found"}

    cursor.execute(
        "INSERT INTO filings (name, content) VALUES (?, ?)",
        (file.filename, text)
    )
    file_id = cursor.lastrowid
    conn.commit()

    try:
        for chunk in chunk_text(text):
            emb = client.embeddings.create(
                model="text-embedding-3-small",
                input=chunk
            )

            vector_blob = pickle.dumps(emb.data[0].embedding)

            cursor.execute(
                "INSERT INTO embeddings (file_id, text, vector) VALUES (?, ?, ?)",
                (file_id, chunk, vector_blob)
            )

        conn.commit()
        return {"success": True, "file_id": file_id, "filename": file.filename}

    except OpenAIError as e:
        return {"error": str(e)}

# ---------- SUMMARY ----------
@app.post("/summary/{file_id}")
async def summary(file_id: int):
    cursor.execute("SELECT content FROM filings WHERE id=?", (file_id,))
    row = cursor.fetchone()

    if not row:
        return {"error": "File not found"}

    try:
        response = client.responses.create(
            model="gpt-4o-mini",
            input=f"""
Summarize key financial insights in bullet points.
Focus on revenue, risks, outlook, and changes.

SEC Filing:
{row[0]}
"""
        )

        summary_text = extract_output_text(response)

        cursor.execute(
            "INSERT INTO summaries (file_id, text) VALUES (?, ?)",
            (file_id, summary_text)
        )
        conn.commit()

        return {"success": True, "summary": summary_text}

    except OpenAIError as e:
        return {"error": str(e)}

# ---------- GET SUMMARIES ----------
@app.get("/summaries")
def get_summaries():
    cursor.execute("SELECT id, file_id, text FROM summaries")
    rows = cursor.fetchall()

    return [
        {"id": r[0], "fileId": r[1], "text": r[2]}
        for r in rows
    ]

# ---------- Q&A ----------
class Question(BaseModel):
    question: str

@app.post("/ask")
async def ask(data: Question):
    cursor.execute("SELECT file_id, text, vector FROM embeddings")
    rows = cursor.fetchall()

    if not rows:
        return {"answer": "No documents uploaded yet."}

    try:
        q_emb = client.embeddings.create(
            model="text-embedding-3-small",
            input=data.question
        )
        q_vector = q_emb.data[0].embedding

        scored = []
        for file_id, text, vector_blob in rows:
            vector = pickle.loads(vector_blob)
            score = cosine_similarity(q_vector, vector)
            scored.append((score, text))

        scored.sort(reverse=True, key=lambda x: x[0])
        context = "\n\n".join([s[1] for s in scored[:4]])

        response = client.responses.create(
            model="gpt-4o-mini",
            input=f"""
Answer using ONLY the context below.
If not found, say "Not found in filing."

Context:
{context}

Question:
{data.question}
"""
        )

        return {"answer": extract_output_text(response)}

    except OpenAIError as e:
        return {"answer": str(e)}

# ---------- STATS ----------
@app.get("/stats")
def stats():
    cursor.execute("SELECT COUNT(*) FROM filings")
    filings = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM summaries")
    summaries = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM embeddings")
    embeddings = cursor.fetchone()[0]

    return {
        "filings": filings,
        "summaries": summaries,
        "embeddings": embeddings
    }
