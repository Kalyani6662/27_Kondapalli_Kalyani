import React, { useState } from "react";
import axios from "axios";

function Analyze() {
  const [chat, setChat] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Upload a SEC filing to begin");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setStatus("Indexing document… please wait ⏳");
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:8000/upload", formData);
      setStatus("Document indexed successfully ✅ Ask your questions below");
    } catch {
      setStatus("Backend not responding ❌ Check FastAPI server");
    }
  };

  const handleAsk = async () => {
    if (!question.trim()) return;

    const updatedChat = [...chat, { role: "user", text: question }];
    setChat(updatedChat);
    setQuestion("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/ask", { question });
      setChat([...updatedChat, { role: "bot", text: res.data.answer }]);
    } catch {
      setChat([...updatedChat, { role: "bot", text: "AI server error ❌" }]);
    }

    setLoading(false);
  };

  return (
    <div className="analyze-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>📄 SEC Filing</h2>

        <label className="upload-box">
          <input type="file" onChange={handleUpload} />
          <span>Click to upload PDF</span>
        </label>

        <p className="status">{status}</p>

        <div className="tips">
          <h4>Try questions like:</h4>
          <ul>
            <li>What are the major risks?</li>
            <li>Is the company profitable?</li>
            <li>Summarize revenue growth</li>
          </ul>
        </div>
      </aside>

      {/* Chat Area */}
      <section className="chat-area">
        <div className="chat-window">
          {chat.map((m, i) => (
            <div
              key={i}
              className={`chat-bubble ${m.role === "user" ? "user" : "bot"}`}
            >
              {m.text}
            </div>
          ))}

          {loading && <div className="thinking">AI is thinking… 🤖</div>}
        </div>

        {/* Input */}
        <div className="chat-input">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            placeholder="Ask a question about the filing…"
          />
          <button onClick={handleAsk}>Ask</button>
        </div>
      </section>

      {/* CSS */}
      <style>{`
        .analyze-wrapper {
          display: flex;
          height: 100vh;
          font-family: 'Inter', 'Segoe UI', sans-serif;
          background: #f4f6f8;
        }

        /* Sidebar */
        .sidebar {
          width: 320px;
          padding: 30px;
          background: linear-gradient(180deg, #0f2027, #203a43);
          color: white;
          box-shadow: 4px 0 20px rgba(0,0,0,0.2);
        }

        .sidebar h2 {
          margin-bottom: 20px;
        }

        .upload-box {
          display: block;
          border: 2px dashed rgba(255,255,255,0.4);
          padding: 25px;
          text-align: center;
          border-radius: 12px;
          cursor: pointer;
          margin-bottom: 15px;
          transition: 0.3s;
        }

        .upload-box:hover {
          background: rgba(255,255,255,0.1);
        }

        .upload-box input {
          display: none;
        }

        .status {
          font-size: 0.9rem;
          color: #d0e6ff;
          margin-bottom: 30px;
        }

        .tips h4 {
          margin-bottom: 10px;
        }

        .tips ul {
          padding-left: 18px;
          font-size: 0.85rem;
          color: #d6dbe0;
        }

        /* Chat Area */
        .chat-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #eef1f4;
        }

        .chat-window {
          flex: 1;
          padding: 30px;
          overflow-y: auto;
        }

        .chat-bubble {
          max-width: 70%;
          padding: 14px 18px;
          margin-bottom: 14px;
          border-radius: 14px;
          line-height: 1.5;
          animation: fadeUp 0.3s ease;
        }

        .chat-bubble.user {
          margin-left: auto;
          background: #0072ff;
          color: white;
          border-bottom-right-radius: 4px;
        }

        .chat-bubble.bot {
          background: white;
          color: #333;
          border-bottom-left-radius: 4px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .thinking {
          font-style: italic;
          color: #0072ff;
        }

        /* Input */
        .chat-input {
          display: flex;
          gap: 10px;
          padding: 20px;
          background: white;
          border-top: 1px solid #ddd;
        }

        .chat-input input {
          flex: 1;
          padding: 14px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
        }

        .chat-input button {
          padding: 14px 26px;
          border-radius: 8px;
          border: none;
          background: linear-gradient(135deg, #00c6ff, #0072ff);
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }

        .chat-input button:hover {
          transform: translateY(-2px);
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 800px) {
          .sidebar {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export default Analyze;
