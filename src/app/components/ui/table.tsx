export function Table({ children }) {
  return (
    <table className="w-full border-collapse table-fixed">{children}</table>
  );
}

export function TableHeader({ children }) {
  return <thead className="bg-gray-100">{children}</thead>;
}

export function TableBody({ children }) {
  return <tbody className="divide-y divide-gray-200">{children}</tbody>;
}

export function TableRow({ children }) {
  return <tr className="hover:bg-gray-50">{children}</tr>;
}

export function TableHead({ children, width }) {
  return (
    <th
      className="text-left px-4 py-2 font-semibold text-gray-700"
      style={width ? { width } : {}}
    >
      {children}
    </th>
  );
}

export function TableCell({ children }) {
  return <td className="px-4 py-2 truncate">{children}</td>;
}
