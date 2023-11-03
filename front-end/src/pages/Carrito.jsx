import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/authContext";
import accounting from "accounting";
import {
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
  increaseCart,
} from "../store/cartSlice";
import { useDispatch } from "react-redux";
import Total from "./Total";
import { Link } from "react-router-dom";
import axios from "axios";

const Carrito = () => {
  const cart = useSelector((state) => state.cart);
  const { isAuthenticated } = useAuth();

  const FuncionComprar = async (producto) => {
    const response = await axios.post(
      "http://localhost:5000/Mercado_Pago",
      producto
    );

    window.location.href = response.data;
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleIncreaseCart = (product) => {
    dispatch(increaseCart(product));
  };

  return (
    <div>
      <Link
        to="/"
        className="flex items-center text-blue-500 font-bold ml-2 mt-5 text-decoration-none"
      >
        <svg
          className="w-5 h-5 mr-2 text-blue-500 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 5H1m0 0 4 4M1 5l4-4"
          />
        </svg>
        <h4>Volver a Compra</h4>
      </Link>

      {cart.cartItems &&
        cart.cartItems.map((item) => (
          <div className="w-full border-b border-gray-200">
            <div className="bg-white p-4 mb-4 flex items-center">
              <img src={item.image} className="w-24 h-24" />
              <div className="ml-4 flex-1">
                <h2 className="text-xl text-gray-900 font-semibold">
                  {item.name}
                </h2>
                <p className="text-gray-600">
                  {accounting.formatMoney(item.price * item.cartQuantity, "$")}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="p-2"
                  onClick={() => handleDecreaseCart(item)}
                >
                  -
                </button>
                <span className="p-2">{item.cartQuantity}</span>
                <button
                  className="p-2 pr-10"
                  onClick={() => handleIncreaseCart(item)}
                >
                  +
                </button>
                <button
                  className="p-2"
                  onClick={() => handleRemoveFromCart(item)}
                >
                  <svg
                    className="w-5 h-5 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="mt-5">
              <h2 className="text-gray-900 text-4xl mb-5 font-bold">
                Total: ${cart.cartTotalAmount}
              </h2>
              {isAuthenticated ? (
                <button
                  onClick={() => FuncionComprar(item)}
                  className="bg-blue-500 hover:bg-blue-700 text-white rounded-md pt-2 pb-2 px-14"
                >
                  COMPRAR
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-blue-500 hover:bg-blue-700 text-white rounded-md pt-2 pb-2 px-14"
                >
                  Inicia Sesión para comprar
                </Link>
              )}
            </div>
          </div>
        ))}

      <div className="flex justify-between items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white p-2 mt-5 ml-5 rounded-md"
          onClick={() => handleClearCart()}
        >
          Vaciar Carrito
        </button>
        <div className="mr-10"></div>
      </div>
    </div>
  );
};

export default Carrito;
