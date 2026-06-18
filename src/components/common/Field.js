export function Field({ children, label }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}
