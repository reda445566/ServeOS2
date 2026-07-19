import ApiError from './ApiError.js';

export const ensureTenantAccess = (resource, userRestaurantId) => {
  if (!resource || !userRestaurantId) {
    throw new ApiError(400, 'Invalid tenant context');
  }

  if (resource.restaurantId !== userRestaurantId) {
    throw new ApiError(403, 'Access denied: resource belongs to another restaurant');
  }

  return true;
};

