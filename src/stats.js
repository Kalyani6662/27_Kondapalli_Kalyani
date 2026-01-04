import { useEffect, useState } from "react";
import API from "./api";

export default function Stats() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch(`${API}/stats`)
      .then(res => res.json())
      .then(data => setCount(data.filings));
  }, []);

  return <p>Documents Indexed: {count}</p>;
}
