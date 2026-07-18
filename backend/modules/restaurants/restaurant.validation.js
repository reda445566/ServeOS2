import { body, validationResult } from "express-validator";
import ApiError from "../../utils/ApiError.js";

const toValidationErrors = (errors) =>
  errors.array().map((error) => ({
    field: error.path,
    message: error.msg,
  }));

export const createRestaurantValidationRules = [
  body("name").trim().notEmpty().withMessage("Restaurant name is required"),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new ApiError(400, "Validation failed", toValidationErrors(errors)));
  }

  next();
};


