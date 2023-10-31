import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card } from "../components/ui";

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
    <div className="h-[calc(70vh-100px)] flex items-center justify-center">
      <Card>
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
              className="pl-2 mt-5 pr-2 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
            >
              Enviar
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default ForgotPassword;
