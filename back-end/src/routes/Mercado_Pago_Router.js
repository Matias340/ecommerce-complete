import { Router } from "express";
import mercadopago from "mercadopago";
import dotenv from "dotenv";
dotenv.config();
const Mercado_Pago = Router();

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN || "",
});

Mercado_Pago.post("/", async (req, res) => {
  const producto = req.body;

  try {
    const preference = {
      items: [
        {
          title: producto.name,
          unit_price: producto.price,
          currency_id: "ARS",
          quantity: producto.quantity,
        },
      ],

      back_urls: {
        success: "http://localhost:5173/",
        failure: "http://localhost:3000/fallo",
      },

      auto_return: "approved",
    };

    const respuesta = await mercadopago.preferences.create(preference);
    console.log(respuesta);
    res.status(200).json(respuesta.response.init_point);
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
});

export default Mercado_Pago;
