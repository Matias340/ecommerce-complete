import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Navbar } from "./components/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Carrito from "./pages/Carrito";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <main className="">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegisterPage />} />
            <Route path="/profile" element={<h1>Profile</h1>} />
            <Route path="/carrito" element={<Carrito />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route
              path="/reset-password/:id/:token"
              element={<ResetPassword />}
            ></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
