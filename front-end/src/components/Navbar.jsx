import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";
import { useSelector } from "react-redux";

export function Navbar() {
  const cart = useSelector((state) => state.cart);
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user);

  return (
    <nav className="bg-blue-500 flex justify-between py-5 px-5">
      <h1 className="text-2xl font-bold text-white">
        <Link to="/">Ecommerce</Link>
      </h1>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li className="text-white mr-10">Bienvenido {user.username}</li>
            <button
              type="button"
              className="relative inline-flex items-center text-sm font-medium text-center text-white bg-blue-500 rounded-lg mr-5"
            >
              <a href="/carrito">
                <svg
                  className="w-6 h-6 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 21"
                >
                  <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                </svg>
                <span className="sr-only">Notifications</span>
                <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                  {cart.cartItems.length}
                </div>
              </a>
            </button>
            <li>
              <Link
                className="text-white "
                to="/login"
                onClick={() => logout()}
              >
                Cerrar Sesión
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="pr-5">
              <ButtonLink to="/login">Iniciar Sesion</ButtonLink>
            </li>
            <li className="pr-5">
              <ButtonLink to="/registro">Registrate</ButtonLink>
            </li>
            <button
              type="button"
              className="relative inline-flex items-center text-sm font-medium text-center text-white bg-blue-500 rounded-lg mr-5"
            >
              <a href="/carrito">
                <svg
                  className="w-6 h-6 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 21"
                >
                  <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                </svg>
                <span className="sr-only">Notifications</span>
                <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                  {cart.cartItems.length}
                </div>
              </a>
            </button>
          </>
        )}
      </ul>
    </nav>
  );
}
