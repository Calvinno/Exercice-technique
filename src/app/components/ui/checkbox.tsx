export function Checkbox({ checked, onCheckedChange }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onCheckedChange}
      className="h-5 w-5 accent-blue-500"
    />
  );
}
