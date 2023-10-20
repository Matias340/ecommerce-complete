import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://root:root@cluster0.eevgnb3.mongodb.net/ecommerce?retryWrites=true&w=majority"
    );
    console.log("db is connected");
  } catch (error) {
    console.log(error);
  }
};
