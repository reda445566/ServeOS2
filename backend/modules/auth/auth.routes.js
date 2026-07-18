
import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import {
  getCurrentUserController,
  loginUserController,
  registerOwnerController,
} from "./auth.controller.js";
import {
  loginValidationRules,
  registerOwnerValidationRules,
  validate,
} from "./auth.validation.js";

const router = express.Router();

router.post("/register-owner", registerOwnerValidationRules, validate, registerOwnerController);
router.post("/login", loginValidationRules, validate, loginUserController);
router.get("/me", authMiddleware, getCurrentUserController);

export default router;



