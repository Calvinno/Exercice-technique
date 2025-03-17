export function Input({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
    />
  );
}
