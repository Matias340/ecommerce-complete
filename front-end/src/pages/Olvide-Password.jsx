import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";
import { Card, Button, Input, Label, Message } from "../components/ui";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import clienteAxios from "../config/Axios";

function OlvidePassword() {
  const { errors: registerErrors } = useAuth();
  const {
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await clienteAxios.post("/auth/olvide-password", {
        email,
      });

      setAlerta({ msg: data.msg });
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
      <Card>
        <h1 className="text-3xl font-bold text-blue-500 mb-4">
          Cambia tu contraseña
        </h1>

        {registerErrors?.map((error, i) => (
          <Message message={error} key={i} />
        ))}
        <form onSubmit={handleSubmit}>
          <Label htmlFor="email">Email:</Label>
          <Input
            name="email"
            placeholder="youremail@domain.tld"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email?.message && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}

          <Button>Enviar</Button>
        </form>
      </Card>
    </div>
  );
}

export default OlvidePassword;
