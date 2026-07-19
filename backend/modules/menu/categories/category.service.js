import prisma from '../../../config/prisma.js';
import ApiError from '../../../utils/ApiError.js';
import { ensureTenantAccess } from '../../../utils/tenant.js';

export const createCategory = async ({ name, isActive, restaurantId }) => {
  const category = await prisma.menuCategory.create({
    data: {
      name: name?.trim(),
      isActive: isActive ?? true,
      restaurantId,
    },
  });

  return category;
};

export const getCategoriesByRestaurant = async (restaurantId) => {
  return prisma.menuCategory.findMany({
    where: { restaurantId },
    orderBy: { createdAt: 'desc' },
  });
};

export const getCategoryById = async (categoryId, userRestaurantId) => {
  const category = await prisma.menuCategory.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  ensureTenantAccess({ restaurantId: category.restaurantId }, userRestaurantId);

  return category;
};

export const updateCategory = async ({ categoryId, name, isActive, userRestaurantId }) => {
  const category = await prisma.menuCategory.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  ensureTenantAccess({ restaurantId: category.restaurantId }, userRestaurantId);

  return prisma.menuCategory.update({
    where: { id: categoryId },
    data: {
      name: name?.trim() || category.name,
      isActive: isActive ?? category.isActive,
    },
  });
};

export const deleteCategory = async ({ categoryId, userRestaurantId }) => {
  const category = await prisma.menuCategory.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  ensureTenantAccess({ restaurantId: category.restaurantId }, userRestaurantId);

  const items = await prisma.menuItem.findMany({
    where: { categoryId },
  });

  if (items.length > 0) {
    throw new ApiError(400, 'Cannot delete a category that contains items');
  }

  return prisma.menuCategory.delete({
    where: { id: categoryId },
  });
};
