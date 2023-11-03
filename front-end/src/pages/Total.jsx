import { useSelector } from "react-redux";

const Total = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <div className="mt-5">
      <h2 className="text-gray-900 text-4xl mb-5 font-bold">
        Total: ${cart.cartTotalAmount}
      </h2>
    </div>
  );
};

export default Total;
