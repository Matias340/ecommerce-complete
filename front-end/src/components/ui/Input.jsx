import { forwardRef } from "react";

export const Input = forwardRef((props, ref) => (
  <input
    {...props}
    ref={ref}
    className="w-full bg-gray-50 border border-gray-300  text-dark px-4 py-2 rounded-md"
  />
));
