import { Link } from "react-router-dom";

export const ButtonLink = ({ to, children }) => (
  <Link
    to={to}
    className=" text-white px-4 py-2 rounded font-bold hover:bg-blue-700"
  >
    {children}
  </Link>
);
