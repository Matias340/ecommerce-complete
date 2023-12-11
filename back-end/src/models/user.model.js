import mongoose, { Schema } from "mongoose";
import generarId from "../helpers/generarId.js";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    token: {
      type: String,
      default: generarId(),
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user", userSchema);
