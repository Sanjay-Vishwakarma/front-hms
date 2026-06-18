export function Alert({ children, tone }) {
  return <div className={`alert ${tone}`}>{children}</div>;
}
