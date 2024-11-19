import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Navbar } from "./components/Navbar";
import Carrito from "./pages/Carrito";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import OlvidePassword from "./pages/Olvide-Password";
import NuevoPassword from "./pages/NuevoPassword";
import Buscador from "./components/Buscador";

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
            <Route path="/olvide-password" element={<OlvidePassword />} />
            <Route path="/olvide-password/:token" element={<NuevoPassword />} />
            <Route path="/carrito" element={<Carrito />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
