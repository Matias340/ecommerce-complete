import { useEffect, useState } from "react";
import { Card } from "../components/ui";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Alerta from "../components/ui/Alerta";

function ConfirmarCuenta() {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  const [cargando, setCargando] = useState(true);

  const [alerta, setAlerta] = useState({});

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const cuenta = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/auth/confirmar/${id}`;
        const { data } = await axios(url);
        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg,
        });
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
      setCargando(false);
    };
    cuenta();
  }, []);

  return (
    <div>
      <div className="h-[calc(100vh-100px)] flex items-center justify-center">
        <Card>
          <h1 className="text-3xl font-bold text-blue-500 mb-4">
            Confirmar Cuenta
          </h1>
          <div>
            {!cargando && <Alerta alerta={alerta} />}

            {cuentaConfirmada && (
              <Link className="text-blue-500 ml-5" to="/login">
                Iniciar Sesión
              </Link>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ConfirmarCuenta;
