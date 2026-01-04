import { useState } from "react";
import API_BASE from "../api";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_BASE}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setMsg(data.success ? "Upload successful ✅" : "Upload failed ❌");
  };

  return (
    <div>
      <h2>Upload Filing</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload</button>
      <p>{msg}</p>
    </div>
  );
}
