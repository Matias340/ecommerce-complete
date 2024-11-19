import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Carga las variables de entorno

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://matias:root@cluster0.3nanw.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0");
    console.log("db is connected");
  } catch (error) {
    console.log(error);
  }
  
};
