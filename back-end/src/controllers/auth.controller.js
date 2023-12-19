import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createAccessToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from "../config.js";
import emailRegistro from "../helpers/emailRegistro.js";
import generarId from "../helpers/generarId.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

export const registro = async (req, res) => {
  const { email, username, token } = req.body;

  // Prevenir usuarios duplicados
  const existeUsuario = await User.findOne({ email });

  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    // Guardar un Nuevo Usuario
    const usuario = new User(req.body);
    const userGuardado = await usuario.save();

    //Enviar el email
    emailRegistro({
      email,
      username,
      token: userGuardado.token,
    });

    res.json(userGuardado);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({
        message: "invalid credentials",
      });

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};

export const confirmar = async (req, res) => {
  const { token } = req.params;

  const usuarioConfirmar = await User.findOne({ token });

  if (!usuarioConfirmar) {
    const error = new Error("Token no valido");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmado = true;
    await usuarioConfirmar.save();

    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

export const olvidePassword = async (req, res) => {
  const { email } = req.body;

  const existeUsuario = await User.findOne({ email });

  if (!existeUsuario) {
    const error = new Error("El usuario no existe");
    return res.status(400).json({ msg: error.message });
  }

  try {
    existeUsuario.token = generarId();
    await existeUsuario.save();

    //Enviar Email
    emailOlvidePassword({
      email,
      username: existeUsuario.username,
      token: existeUsuario.token,
    });

    res.json({ msg: "Hemos enviado un email" });
  } catch (error) {
    console.log(error);
  }
};

export const comprobarToken = async (req, res) => {
  const { token } = req.params;

  const tokenValido = await User.findOne({ token });

  if (tokenValido) {
    res.json({ msg: "Token valido" });
  } else {
    const error = new Error("Token no valido");
    return res.status(400).json({ msg: error.message });
  }
};

export const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  console.log(token);
  const { password } = req.body;

  const usuario = await User.findOne({ token });
  if (!usuario) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }

  try {
    usuario.token = null;
    usuario.password = password;
    await usuario.save();
    res.json({ msg: "Password modificado" });
  } catch (error) {
    console.log(error);
  }
};
