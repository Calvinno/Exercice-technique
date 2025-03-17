export function Button({
  children,
  onClick,
  variant = "default",
  size = "md",
}) {
  const baseStyles = "font-medium rounded-lg transition duration-300";
  const variants = {
    default: "bg-[rgb(251,177,56)] hover:bg-[rgb(251,190,56)] text-white",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    icon: "p-2 border border-gray-300 hover:bg-gray-100",
  };
  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
