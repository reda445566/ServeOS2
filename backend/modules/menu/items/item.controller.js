import ApiResponse from '../../../utils/ApiResponse.js';
import {
  createItem,
  deleteItem,
  getItemById,
  getItemsByRestaurant,
  updateItem,
} from './item.service.js';

export const createItemController = async (req, res, next) => {
  try {
    const item = await createItem({
      ...req.body,
      restaurantId: req.user.restaurantId,
    });

    res.status(201).json(new ApiResponse(201, item, 'Item created successfully'));
  } catch (error) {
    next(error);
  }
};

export const getItemsController = async (req, res, next) => {
  try {
    const items = await getItemsByRestaurant(req.user.restaurantId);
    res.status(200).json(new ApiResponse(200, items, 'Items fetched successfully'));
  } catch (error) {
    next(error);
  }
};

export const getItemController = async (req, res, next) => {
  try {
    const item = await getItemById(req.params.id, req.user.restaurantId);
    res.status(200).json(new ApiResponse(200, item, 'Item fetched successfully'));
  } catch (error) {
    next(error);
  }
};

export const updateItemController = async (req, res, next) => {
  try {
    const item = await updateItem({
      itemId: req.params.id,
      ...req.body,
      userRestaurantId: req.user.restaurantId,
    });

    res.status(200).json(new ApiResponse(200, item, 'Item updated successfully'));
  } catch (error) {
    next(error);
  }
};

export const deleteItemController = async (req, res, next) => {
  try {
    await deleteItem({
      itemId: req.params.id,
      userRestaurantId: req.user.restaurantId,
    });

    res.status(200).json(new ApiResponse(200, null, 'Item deleted successfully'));
  } catch (error) {
    next(error);
  }
};
