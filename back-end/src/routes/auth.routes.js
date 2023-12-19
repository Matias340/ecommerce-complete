import { Router } from "express";
import {
  login,
  registro,
  logout,
  verifyToken,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schemas.js";

const router = Router();

router.post("/registro", validateSchema(registerSchema), registro);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", verifyToken, logout);
router.get("/verify", verifyToken);
router.get("/confirmar/:token", confirmar);
router.post("/olvide-password", olvidePassword);

router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

export default router;
