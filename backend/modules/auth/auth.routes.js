import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import { ROLES } from "../../constants/roles.js";
import {
  getCurrentUserController,
  loginUserController,
  registerEmployeeController,
  registerOwnerController,
} from "./auth.controller.js";
import {
  loginValidationRules,
  registerEmployeeValidationRules,
  registerOwnerValidationRules,
  validate,
} from "./auth.validation.js";

const router = express.Router();

router.post("/register-owner", registerOwnerValidationRules, validate, registerOwnerController);
router.post(
  "/register-employee",
  authMiddleware,
  roleMiddleware(ROLES.OWNER, ROLES.MANAGER),
  registerEmployeeValidationRules,
  validate,
  registerEmployeeController
);
router.post("/login", loginValidationRules, validate, loginUserController);
router.get("/me", authMiddleware, getCurrentUserController);

export default router;


