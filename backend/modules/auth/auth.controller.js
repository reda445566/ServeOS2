import ApiResponse from "../../utils/ApiResponse.js";
import { loginUser, registerOwner } from "./auth.service.js";

export const registerOwnerController = async (req, res, next) => {
  try {
    const result = await registerOwner(req.body);

    res.cookie("accessToken", result.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json(new ApiResponse(201, result, "Owner registered successfully"));
  } catch (error) {
    next(error);
  }
};

export const loginUserController = async (req, res, next) => {
  try {
    const result = await loginUser(req.body);

    res.cookie("accessToken", result.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json(new ApiResponse(200, result, "Login successful"));
  } catch (error) {
    next(error);
  }
};

export const getCurrentUserController = (req, res) => {
  res.status(200).json(new ApiResponse(200, { user: req.user }, "User fetched successfully"));
};



