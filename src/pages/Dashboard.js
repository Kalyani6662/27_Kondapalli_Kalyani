import { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000";

function Dashboard() {
  const [stats, setStats] = useState({ filings: 0, summaries: 0, qa: 0 });
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(`${API}/stats`)
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  const uploadFile = async () => {
    if (!file) return alert("Select a PDF first");

    const formData = new FormData();
    formData.append("file", file);

    await fetch(`${API}/upload`, {
      method: "POST",
      body: formData
    });

    alert("✅ File Uploaded Successfully");

    // refresh stats
    const res = await fetch(`${API}/stats`);
    setStats(await res.json());
  };

  const askQuestion = async () => {
    if (!question) return;

    const res = await fetch(`${API}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await res.json();

    setMessages(prev => [
      ...prev,
      { role: "user", text: question },
      { role: "ai", text: data.answer || "No answer" }
    ]);

    setQuestion("");
  };

  return (
    <div style={styles.dashboard}>

      {/* STATS */}
      <div style={styles.stats}>
        <div style={styles.card}>📄 Filings<br />{stats.filings}</div>
        <div style={styles.card}>📝 Summaries<br />{stats.summaries}</div>
        <div style={styles.card}>💬 Q&A Chunks<br />{stats.qa}</div>
      </div>

      {/* UPLOAD */}
      <div style={styles.upload}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button style={styles.button} onClick={uploadFile}>
          Upload Filing
        </button>
      </div>

      {/* CHAT */}
      <div style={styles.chat}>
        <div style={styles.messages}>
          {messages.length === 0 && (
            <div style={{ color: "#888" }}>No documents uploaded yet</div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              style={m.role === "user" ? styles.user : styles.ai}
            >
              {m.text}
            </div>
          ))}
        </div>

        <input
          style={styles.input}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your question..."
        />

        <button style={styles.askButton} onClick={askQuestion}>
          Ask
        </button>
      </div>

    </div>
  );
}

/* ===== INBUILT CSS ===== */
const styles = {
  dashboard: {
    maxWidth: "1100px",
    margin: "auto",
    padding: "30px",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f4f6fb",
    minHeight: "100vh"
  },

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "30px"
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "600",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
  },

  upload: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    display: "flex",
    gap: "15px",
    alignItems: "center",
    marginBottom: "30px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
  },

  button: {
    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "10px 16px",
    fontWeight: "600",
    cursor: "pointer"
  },

  chat: {
    background: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
  },

  messages: {
    height: "300px",
    overflowY: "auto",
    marginBottom: "15px"
  },

  user: {
    background: "#2563eb",
    color: "white",
    padding: "10px 14px",
    borderRadius: "12px",
    marginBottom: "10px",
    maxWidth: "70%",
    marginLeft: "auto"
  },

  ai: {
    background: "#e5e7eb",
    color: "#111",
    padding: "10px 14px",
    borderRadius: "12px",
    marginBottom: "10px",
    maxWidth: "70%"
  },

  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "10px"
  },

  askButton: {
    width: "100%",
    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "12px",
    fontWeight: "600",
    cursor: "pointer"
  }
};

export default Dashboard;
