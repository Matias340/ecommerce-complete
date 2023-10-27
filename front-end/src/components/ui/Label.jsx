export function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="text-sm block my-1 text-gray-900">
      {children}
    </label>
  );
}
