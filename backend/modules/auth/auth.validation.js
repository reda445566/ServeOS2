import { body, validationResult } from "express-validator";
import ApiError from "../../utils/ApiError.js";

const toValidationErrors = (errors) =>
  errors.array().map((error) => ({
    field: error.path,
    message: error.msg,
  }));

// All auth validations are handled with Express Validator middleware.
export const registerOwnerValidationRules = [
  body("restaurantName").trim().notEmpty().withMessage("Restaurant name is required"),
  body("ownerEmail")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Valid email is required"),
  body("ownerPassword")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("branchName").trim().notEmpty().withMessage("Branch name is required"),
];

export const loginValidationRules = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Valid email is required"),
  body("password").trim().notEmpty().withMessage("Password is required"),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new ApiError(400, "Validation failed", toValidationErrors(errors)));
  }

  next();
};


