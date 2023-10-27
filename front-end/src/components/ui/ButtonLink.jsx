import { Link } from "react-router-dom";

export const ButtonLink = ({ to, children }) => (
  <Link
    to={to}
    className=" text-white px-4 py-2 font-bold rounded-t-lg border-b-2 border-blue-500 hover:border-b-white"
  >
    {children}
  </Link>
);
