import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Button, Input, Label } from "../components/ui";
import clienteAxios from "../config/Axios";

function NuevoPassword() {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/auth/olvide-password/${token}`);
        setAlerta({
          msg: "Coloca tu Nuevo Password",
        });
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: "hubo un error con el enlace",
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = `/auth/olvide-password/${token}`;
      const { data } = await clienteAxios(url, { password });

      setAlerta({
        msg: data.msg,
      });
      setPasswordModificado(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      {tokenValido && (
        <Card>
          <h1 className="text-3xl font-bold text-blue-500 mb-4">
            Nueva contraseña
          </h1>

          <form onSubmit={handleSubmit}>
            <Label htmlFor="password">Contraseña:</Label>
            <Input
              type="password"
              name="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button>Enviar</Button>
          </form>
        </Card>
      )}

      {passwordModificado && (
        <Link className="text-blue-500 ml-5" to="/login">
          Iniciar Sesión
        </Link>
      )}
    </div>
  );
}

export default NuevoPassword;
