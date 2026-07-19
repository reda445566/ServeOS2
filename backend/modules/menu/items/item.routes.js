import express from 'express';
import authMiddleware from '../../../middlewares/auth.middleware.js';
import roleMiddleware from '../../../middlewares/role.middleware.js';
import { ROLES } from '../../../constants/roles.js';
import {
  createItemController,
  deleteItemController,
  getItemController,
  getItemsController,
  updateItemController,
} from './item.controller.js';
import { createItemValidationRules, validate } from './item.validation.js';

const router = express.Router();

router.get('/', authMiddleware, getItemsController);
router.get('/:id', authMiddleware, getItemController);
router.post('/', authMiddleware, roleMiddleware(ROLES.OWNER, ROLES.MANAGER), createItemValidationRules, validate, createItemController);
router.put('/:id', authMiddleware, roleMiddleware(ROLES.OWNER, ROLES.MANAGER), createItemValidationRules, validate, updateItemController);
router.delete('/:id', authMiddleware, roleMiddleware(ROLES.OWNER, ROLES.MANAGER), deleteItemController);

export default router;
