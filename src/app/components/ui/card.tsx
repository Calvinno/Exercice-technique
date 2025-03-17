export function Card({ children }) {
  return <div className="bg-white shadow-lg rounded-xl p-4">{children}</div>;
}

export function CardContent({ children }) {
  return <div className="p-4">{children}</div>;
}
