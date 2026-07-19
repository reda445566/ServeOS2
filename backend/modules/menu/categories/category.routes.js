import express from 'express';
import authMiddleware from '../../../middlewares/auth.middleware.js';
import roleMiddleware from '../../../middlewares/role.middleware.js';
import { ROLES } from '../../../constants/roles.js';
import {
  createCategoryController,
  deleteCategoryController,
  getCategoriesController,
  getCategoryController,
  updateCategoryController,
} from './category.controller.js';
import { createCategoryValidationRules, validate } from './category.validation.js';

const router = express.Router();

router.get('/', authMiddleware, getCategoriesController);
router.get('/:id', authMiddleware, getCategoryController);
router.post('/', authMiddleware, roleMiddleware(ROLES.OWNER, ROLES.MANAGER), createCategoryValidationRules, validate, createCategoryController);
router.put('/:id', authMiddleware, roleMiddleware(ROLES.OWNER, ROLES.MANAGER), createCategoryValidationRules, validate, updateCategoryController);
router.delete('/:id', authMiddleware, roleMiddleware(ROLES.OWNER, ROLES.MANAGER), deleteCategoryController);

export default router;
