import express from "express";
import { login, register, verifyEmail } from "../controllers/authController";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify/:token", verifyEmail);

export default router;