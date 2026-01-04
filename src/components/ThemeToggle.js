function ThemeToggle() {
  return (
    <button onClick={() => document.body.classList.toggle("dark")}>
      🌙 Toggle Theme
    </button>
  );
}
export default ThemeToggle;
