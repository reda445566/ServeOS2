import ApiResponse from "../../utils/ApiResponse.js";
import { createRestaurantWithBranch, getRestaurantById } from "./restaurant.service.js";

export const createRestaurantController = async (req, res, next) => {
  try {
    const result = await createRestaurantWithBranch({
      name: req.body.name,
      ownerId: req.user.id,
      branchName: req.body.branchName,
    });

    res.status(201).json(new ApiResponse(201, result, "Restaurant created successfully"));
  } catch (error) {
    next(error);
  }
};

export const getRestaurantController = async (req, res, next) => {
  try {
    const restaurant = await getRestaurantById(req.user.restaurantId);
    res.status(200).json(new ApiResponse(200, restaurant, "Restaurant fetched successfully"));
  } catch (error) {
    next(error);
  }
};


