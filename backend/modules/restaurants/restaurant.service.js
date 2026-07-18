import prisma from "../../config/prisma.js";
import ApiError from "../../utils/ApiError.js";

export const createRestaurantWithBranch = async ({ name, ownerId, branchName }) => {
  const restaurant = await prisma.restaurant.create({
    data: {
      name: name?.trim(),
      ownerId,
    },
  });

  const branch = await prisma.branch.create({
    data: {
      name: branchName?.trim() || "Main Branch",
      restaurantId: restaurant.id,
    },
  });

  await prisma.user.update({
    where: { id: ownerId },
    data: {
      restaurantId: restaurant.id,
      branchId: branch.id,
    },
  });

  await prisma.restaurant.update({
    where: { id: restaurant.id },
    data: { ownerId },
  });

  return { restaurant, branch };
};

export const getRestaurantById = async (restaurantId) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: restaurantId },
    include: {
      branches: true,
      users: true,
    },
  });

  if (!restaurant) {
    throw new ApiError(404, "Restaurant not found");
  }

  return restaurant;
};
