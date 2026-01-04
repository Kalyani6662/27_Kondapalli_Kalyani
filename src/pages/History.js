function History() {
  const files = ["Tesla_10K.pdf", "Apple_10Q.pdf"];

  return (
    <div className="glass-card">
      <h2>Upload History</h2>
      <ul>
        {files.map((f, i) => <li key={i}>📄 {f}</li>)}
      </ul>
    </div>
  );
}
export default History;
