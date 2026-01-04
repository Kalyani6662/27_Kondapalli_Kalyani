function Home() {
  return (
    <>
      <style>{`
        .page {
          min-height: 100vh;
          padding: 40px;
          background: linear-gradient(135deg, #0f172a 40%, #020617);
          color: white;
          font-family: "Inter", system-ui, sans-serif;
        }

        .hero {
          text-align: center;
          max-width: 900px;
          margin: 0 auto 60px auto;
        }

        .hero h1 {
          font-size: 3rem;
          margin-bottom: 10px;
          background: linear-gradient(to right, #38bdf8, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          color: #cbd5f5;
          font-size: 1.2rem;
          margin-bottom: 25px;
        }

        .cta {
          display: flex;
          justify-content: center;
          gap: 15px;
        }

        .btn {
          padding: 12px 26px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          transition: 0.3s;
        }

        .primary {
          background: #38bdf8;
          color: black;
          font-weight: bold;
        }

        .primary:hover {
          background: white;
        }

        .secondary {
          background: transparent;
          border: 1px solid #94a3b8;
          color: white;
        }

        .secondary:hover {
          background: #1e293b;
        }

        .grid {
          margin-top: 40px;
          display: grid;
          gap: 25px;
        }

        .card {
          background: rgba(255, 255, 255, 0.08);
          padding: 22px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(10px);
          transition: 0.3s;
        }

        .card:hover {
          transform: translateY(-5px);
          border-color: #38bdf8;
        }

        .features {
          margin-top: 60px;
          text-align: center;
        }

        .features h2 {
          font-size: 2rem;
          margin-bottom: 20px;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 15px;
        }

        .feature-box {
          background: #111827;
          padding: 18px;
          border-radius: 12px;
          border: 1px solid #1f2937;
          transition: 0.3s;
        }

        .feature-box:hover {
          border-color: #38bdf8;
        }

        footer {
          margin-top: 70px;
          text-align: center;
          color: #9ca3af;
        }
      `}</style>

      <div className="page">
        <section className="hero">
          <h1>SEC Filing Summarizer & Q&A</h1>
          <p className="subtitle">
            AI-powered platform to summarize SEC filings and answer your questions
            using a Retrieval-Augmented Generation (RAG) system.
          </p>

          <div className="cta">
            <button className="btn primary">Upload Filing</button>
            <button className="btn secondary">Try Demo</button>
          </div>
        </section>

        <div className="grid">
          <div className="card">
            <h3>📄 The Challenge</h3>
            <p>
              SEC filings like 10-K and 10-Q are complex, lengthy, and difficult
              to analyze manually, making research time-consuming.
            </p>
          </div>

          <div className="card">
            <h3>🤖 Our Solution</h3>
            <p>
              Our RAG-based AI intelligently summarizes filings and allows users
              to ask natural language questions with accurate, document-backed answers.
            </p>
          </div>

          <div className="card">
            <h3>⚡ Key Benefits</h3>
            <p>
              Save hours of manual reading, improve understanding, and access
              verified insights instantly with AI-powered precision.
            </p>
          </div>
        </div>

        <section className="features">
          <h2>Powerful Features</h2>
          <div className="feature-grid">
            <div className="feature-box">📌 Accurate AI Summaries</div>
            <div className="feature-box">🔎 RAG-based Q&A</div>
            <div className="feature-box">📂 Supports 10-K / 10-Q</div>
            <div className="feature-box">⚙️ Real-time Processing</div>
            <div className="feature-box">📑 Source Referencing</div>
            <div className="feature-box">💼 Investor & Student Friendly</div>
          </div>
        </section>

        <footer>
          <p>SEC Filing Summarizer & Q&A — Powered by AI</p>
        </footer>
      </div>
    </>
  );
}

export default Home;
