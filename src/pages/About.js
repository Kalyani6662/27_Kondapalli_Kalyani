import React from "react";

function About() {
  return (
    <div className="about-wrapper">
      <div className="about-container">
        {/* Header */}
        <h1 className="about-title">About SEC Filing AI Assistant</h1>
        <p className="about-subtitle">
          A smart AI system that helps users understand complex SEC financial
          filings using summarization and question-answering.
        </p>

        {/* What it does */}
        <section className="about-section">
          <h2>What does this tool do?</h2>
          <p>
            SEC filings such as 10-K and 10-Q reports are long and difficult to
            read. This application uses Artificial Intelligence to break down
            these documents into simple summaries and allows users to ask
            questions directly from the document.
          </p>
        </section>

        {/* How it works */}
        <section className="about-section">
          <h2>How does it work?</h2>
          <div className="steps">
            <div className="step">📄 Upload SEC Filing (PDF)</div>
            <div className="step">🧠 AI processes and understands content</div>
            <div className="step">📊 Key insights are summarized</div>
            <div className="step">💬 Ask questions and get accurate answers</div>
          </div>
        </section>

        {/* Tech stack */}
        <section className="about-section">
          <h2>Technology Stack</h2>
          <div className="tech-stack">
            <div className="tech-card">⚛️ React.js (Frontend)</div>
            <div className="tech-card">🚀 FastAPI (Backend)</div>
            <div className="tech-card">🧠 LangChain (RAG Pipeline)</div>
            <div className="tech-card">🔎 Vector DB (Chroma)</div>
            <div className="tech-card">🤖 OpenAI LLM</div>
          </div>
        </section>

        {/* Closing */}
        <section className="about-section highlight">
          <p>
            Our goal is to make financial information more accessible,
            understandable, and interactive for everyone using AI.
          </p>
        </section>
      </div>

      {/* CSS */}
      <style>{`
        .about-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f2027, #203a43);
          padding: 60px 20px;
          font-family: 'Inter', 'Segoe UI', sans-serif;
          color: #ffffff;
        }

        .about-container {
          max-width: 900px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(14px);
          border-radius: 20px;
          padding: 60px 50px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
          animation: fadeIn 0.8s ease;
        }

        .about-title {
          font-size: 2.8rem;
          margin-bottom: 15px;
          text-align: center;
        }

        .about-subtitle {
          text-align: center;
          color: #d0d7dd;
          font-size: 1.1rem;
          margin-bottom: 50px;
        }

        .about-section {
          margin-bottom: 45px;
        }

        .about-section h2 {
          font-size: 1.6rem;
          margin-bottom: 15px;
          color: #00c6ff;
        }

        .about-section p {
          color: #e0e6eb;
          line-height: 1.7;
          font-size: 1rem;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 15px;
        }

        .step {
          background: rgba(255, 255, 255, 0.1);
          padding: 16px 18px;
          border-radius: 14px;
          font-size: 0.95rem;
        }

        .tech-stack {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 18px;
        }

        .tech-card {
          background: rgba(255, 255, 255, 0.12);
          padding: 18px;
          border-radius: 16px;
          text-align: center;
          font-size: 0.95rem;
        }

        .highlight {
          background: linear-gradient(135deg, #00c6ff, #0072ff);
          padding: 20px 25px;
          border-radius: 16px;
          text-align: center;
          font-weight: 500;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 600px) {
          .about-container {
            padding: 40px 25px;
          }

          .about-title {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </div>
  );
}

export default About;
