import { useSelector } from "react-redux";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";

const Total = () => {
  const cart = useSelector((state) => state.cart);
  const { isAuthenticated } = useAuth();

  return (
    <div className="mt-5">
      <h2 className="text-gray-900 text-4xl mb-5 font-bold">
        Total: ${cart.cartTotalAmount}
      </h2>
      {isAuthenticated ? (
        <Link
          to="/formas-pago"
          className="bg-blue-500 text-white rounded-md pt-2 pb-2 px-14"
        >
          COMPRAR
        </Link>
      ) : (
        <Link
          to="/login"
          className="bg-blue-500 text-white rounded-md pt-2 pb-2 px-14"
        >
          Inicia Sesión para comprar
        </Link>
      )}
    </div>
  );
};

export default Total;
