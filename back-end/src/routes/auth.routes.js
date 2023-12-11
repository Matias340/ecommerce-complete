import { Router } from "express";
import {
  login,
  registro,
  logout,
  verifyToken,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  confirmar,
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schemas.js";

const router = Router();

router.post("/registro", validateSchema(registerSchema), registro);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", verifyToken, logout);
router.get("/verify", verifyToken);
router.get("/confirmar/:token", confirmar);
router.post("/forgot-password", olvidePassword);
router.get("/forgot-password/:token", comprobarToken);
router.post("/forgot-password/:token", nuevoPassword);

export default router;
