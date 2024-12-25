// server/src/services/auth/auth.routes.ts
import { Router } from "express";
import {
  register,
  login,
  getAllUsers,
  logout,
  getUserById,
  getProtectedContent,
  getProfile,
} from "./auth.controller";
import { authenticateToken } from "./auth.middlewares";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/users/:id", getUserById);
router.get("/users", getAllUsers);
router.get("/profile", authenticateToken, getProfile);
router.get("/protected", authenticateToken, getProtectedContent);

export default router;
