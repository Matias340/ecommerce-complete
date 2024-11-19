import express from "express";
import morgan from "morgan";
import cors from "cors";
import products from "./products.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

import Mercado_Pago from "./routes/Mercado_Pago_Router.js";

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
  res.send('¡Hola, el servidor está funcionando!');
});

app.get("/products", (req, res) => {
  res.send(products);
});

app.use("/Mercado_Pago", Mercado_Pago);

export default app;
