import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { createRestaurantController, getRestaurantController } from "./restaurant.controller.js";
import { createRestaurantValidationRules, validate } from "./restaurant.validation.js";

const router = express.Router();

router.post("/", authMiddleware, createRestaurantValidationRules, validate, createRestaurantController);
router.get("/me", authMiddleware, getRestaurantController);

export default router;


