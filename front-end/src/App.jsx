import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Navbar } from "./components/Navbar";
import Carrito from "./pages/Carrito";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";

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
            <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            <Route path="/carrito" element={<Carrito />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
