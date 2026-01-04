import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Existing Pages
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import About from './pages/About';

// Remaining Advanced Page
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">

        {/* ===== Professional Navigation Bar ===== */}
        <nav
          style={{
            padding: '15px 30px',
            background: 'linear-gradient(90deg, #1a2a6c, #3f5efb)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'white',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
          }}
        >
          <div style={{ fontWeight: 'bold', fontSize: '1.6rem' }}>
            SEC AI ANALYZER
          </div>

          <div style={{ display: 'flex', gap: '22px' }}>
            <Link style={linkStyle} to="/">Home</Link>
            <Link style={linkStyle} to="/dashboard">Dashboard</Link>
            <Link style={linkStyle} to="/analyze">Analyze</Link>
            <Link style={linkStyle} to="/about">About</Link>
          </div>
        </nav>

        {/* ===== Page Content ===== */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/about" element={<About />} />
        </Routes>

      </div>
    </Router>
  );
}

/* ===== Navbar Link Style ===== */
const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: '500',
  fontSize: '0.95rem'
};

export default App;
