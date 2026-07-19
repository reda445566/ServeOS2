import prisma from '../../../config/prisma.js';
import ApiError from '../../../utils/ApiError.js';
import { ensureTenantAccess } from '../../../utils/tenant.js';

export const createItem = async ({ name, description, price, categoryId, isActive, restaurantId }) => {
  const category = await prisma.menuCategory.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  ensureTenantAccess({ restaurantId: category.restaurantId }, restaurantId);

  if (price <= 0) {
    throw new ApiError(400, 'Price must be greater than zero');
  }

  return prisma.menuItem.create({
    data: {
      name: name?.trim(),
      description: description?.trim(),
      price,
      categoryId,
      isActive: isActive ?? true,
      isSoftDeleted: false,
    },
  });
};

export const getItemsByRestaurant = async (restaurantId) => {
  return prisma.menuItem.findMany({
    where: {
      category: {
        restaurantId,
      },
    },
    include: {
      category: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const getItemById = async (itemId, userRestaurantId) => {
  const item = await prisma.menuItem.findUnique({
    where: { id: itemId },
    include: { category: true },
  });

  if (!item) {
    throw new ApiError(404, 'Item not found');
  }

  ensureTenantAccess({ restaurantId: item.category.restaurantId }, userRestaurantId);

  return item;
};

export const updateItem = async ({ itemId, name, description, price, categoryId, isActive, userRestaurantId }) => {
  const item = await prisma.menuItem.findUnique({
    where: { id: itemId },
    include: { category: true },
  });

  if (!item) {
    throw new ApiError(404, 'Item not found');
  }

  ensureTenantAccess({ restaurantId: item.category.restaurantId }, userRestaurantId);

  if (price !== undefined && price <= 0) {
    throw new ApiError(400, 'Price must be greater than zero');
  }

  if (categoryId) {
    const category = await prisma.menuCategory.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new ApiError(404, 'Category not found');
    }

    ensureTenantAccess({ restaurantId: category.restaurantId }, userRestaurantId);
  }

  return prisma.menuItem.update({
    where: { id: itemId },
    data: {
      name: name?.trim() || item.name,
      description: description?.trim() ?? item.description,
      price: price ?? item.price,
      categoryId: categoryId || item.categoryId,
      isActive: isActive ?? item.isActive,
    },
  });
};

export const deleteItem = async ({ itemId, userRestaurantId }) => {
  const item = await prisma.menuItem.findUnique({
    where: { id: itemId },
    include: { category: true },
  });

  if (!item) {
    throw new ApiError(404, 'Item not found');
  }

  ensureTenantAccess({ restaurantId: item.category.restaurantId }, userRestaurantId);

  return prisma.menuItem.update({
    where: { id: itemId },
    data: {
      isSoftDeleted: true,
    },
  });
};
