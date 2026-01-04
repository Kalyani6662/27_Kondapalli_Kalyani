import { useState } from "react";
import API from "../api";

export default function Chat() {
  const [q, setQ] = useState("");
  const [a, setA] = useState("");

  const ask = async () => {
    const res = await fetch(`${API}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: q }),
    });
    const data = await res.json();
    setA(data.answer);
  };

  return (
    <div>
      <input value={q} onChange={(e) => setQ(e.target.value)} />
      <button onClick={ask}>Ask</button>
      <p>{a}</p>
    </div>
  );
}
