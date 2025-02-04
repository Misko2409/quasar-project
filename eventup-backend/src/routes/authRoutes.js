import express from "express";
import { register, login } from "../controllers/authController.js";
import { updateUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/user", authMiddleware, updateUser);

export default router;
