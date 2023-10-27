import express from "express";
import morgan from "morgan";
import cors from "cors";
import products from "./products.js";

import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get("/products", (req, res) => {
  res.send(products);
});

export default app;
