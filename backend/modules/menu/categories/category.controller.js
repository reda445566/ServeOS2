import ApiResponse from '../../../utils/ApiResponse.js';
import {
  createCategory,
  deleteCategory,
  getCategoriesByRestaurant,
  getCategoryById,
  updateCategory,
} from './category.service.js';

export const createCategoryController = async (req, res, next) => {
  try {
    const category = await createCategory({
      ...req.body,
      restaurantId: req.user.restaurantId,
    });

    res.status(201).json(new ApiResponse(201, category, 'Category created successfully'));
  } catch (error) {
    next(error);
  }
};

export const getCategoriesController = async (req, res, next) => {
  try {
    const categories = await getCategoriesByRestaurant(req.user.restaurantId);
    res.status(200).json(new ApiResponse(200, categories, 'Categories fetched successfully'));
  } catch (error) {
    next(error);
  }
};

export const getCategoryController = async (req, res, next) => {
  try {
    const category = await getCategoryById(req.params.id, req.user.restaurantId);
    res.status(200).json(new ApiResponse(200, category, 'Category fetched successfully'));
  } catch (error) {
    next(error);
  }
};

export const updateCategoryController = async (req, res, next) => {
  try {
    const category = await updateCategory({
      categoryId: req.params.id,
      ...req.body,
      userRestaurantId: req.user.restaurantId,
    });

    res.status(200).json(new ApiResponse(200, category, 'Category updated successfully'));
  } catch (error) {
    next(error);
  }
};

export const deleteCategoryController = async (req, res, next) => {
  try {
    await deleteCategory({
      categoryId: req.params.id,
      userRestaurantId: req.user.restaurantId,
    });

    res.status(200).json(new ApiResponse(200, null, 'Category deleted successfully'));
  } catch (error) {
    next(error);
  }
};
