import { body, validationResult } from 'express-validator';
import ApiError from '../../../utils/ApiError.js';

const toValidationErrors = (errors) =>
  errors.array().map((error) => ({
    field: error.path,
    message: error.msg,
  }));

export const createItemValidationRules = [
  body('name').trim().notEmpty().withMessage('Item name is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than zero'),
  body('categoryId').trim().notEmpty().withMessage('Category ID is required'),
  body('description').optional().trim(),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new ApiError(400, 'Validation failed', toValidationErrors(errors)));
  }

  next();
};
