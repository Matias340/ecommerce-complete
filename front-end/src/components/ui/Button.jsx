export function Button({ onClick, children }) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 px-4 py-1 rounded-md my-2 text-white mt-4"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
