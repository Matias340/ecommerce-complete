import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/forgot-password", { email })
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-dark p-3 rounded w-25">
        <h2 className="font-bold text-2xl text-gray-900 mb-10">
          Olvido de contraseña
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="text-gray-900 mr-2" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control border border-gray-300 bg-gray-50 rounded-md pl-2 text-black"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="pl-2 pr-2 py-1 bg-blue-500 text-white rounded-md"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
