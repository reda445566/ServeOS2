import bcrypt from "bcryptjs";
import prisma from "../../config/prisma.js";
import { ROLES } from "../../constants/roles.js";
import ApiError from "../../utils/ApiError.js";
import { generateToken } from "../../utils/jwt.js";

export const registerOwner = async ({ restaurantName, ownerEmail, ownerPassword, branchName }) => {
  const normalizedEmail = ownerEmail?.trim().toLowerCase();

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    throw new ApiError(409, "Email already registered");
  }

  const passwordHash = await bcrypt.hash(ownerPassword, 12);

  const result = await prisma.$transaction(async (tx) => {
    const restaurant = await tx.restaurant.create({
      data: {
        name: restaurantName?.trim() || "My Restaurant",
      },
    });

    const user = await tx.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        role: "OWNER",
        restaurantId: restaurant.id,
        status: "ACTIVE",
      },
    });

    const branch = await tx.branch.create({
      data: {
        name: branchName?.trim() || "Main Branch",
        restaurantId: restaurant.id,
      },
    });

    await tx.user.update({
      where: { id: user.id },
      data: { branchId: branch.id },
    });

    await tx.restaurant.update({
      where: { id: restaurant.id },
      data: { ownerId: user.id },
    });

    await tx.auditLog.create({
      data: {
        userId: user.id,
        action: "REGISTER_OWNER",
        details: `Registered restaurant ${restaurant.name}`,
      },
    });

    return { restaurant, branch, user };
  });

  const token = generateToken({
    id: result.user.id,
    email: result.user.email,
    role: result.user.role,
    restaurantId: result.restaurant.id,
    branchId: result.branch.id,
  });

  return {
    user: {
      id: result.user.id,
      email: result.user.email,
      role: result.user.role,
      status: result.user.status,
      restaurantId: result.restaurant.id,
      branchId: result.branch.id,
    },
    restaurant: result.restaurant,
    branch: result.branch,
    token,
  };
};

export const registerEmployee = async ({ email, password, role, branchId, currentUser }) => {
  const normalizedEmail = email?.trim().toLowerCase();

  if (![ROLES.OWNER, ROLES.MANAGER].includes(currentUser?.role)) {
    throw new ApiError(403, "Only owners or managers can register employees");
  }

  if (!currentUser?.restaurantId) {
    throw new ApiError(400, "Current user is not attached to a restaurant");
  }

  const allowedRoles = [ROLES.MANAGER, ROLES.CASHIER, ROLES.WAITER, ROLES.CHEF];
  if (!allowedRoles.includes(role)) {
    throw new ApiError(400, "Invalid employee role");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    throw new ApiError(409, "Email already registered");
  }

  let targetBranchId = branchId || currentUser.branchId || null;

  if (targetBranchId) {
    const branch = await prisma.branch.findFirst({
      where: {
        id: targetBranchId,
        restaurantId: currentUser.restaurantId,
      },
    });

    if (!branch) {
      throw new ApiError(400, "Branch does not belong to your restaurant");
    }
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email: normalizedEmail,
      passwordHash,
      role,
      restaurantId: currentUser.restaurantId,
      branchId: targetBranchId,
      status: "ACTIVE",
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: currentUser.id,
      action: "REGISTER_EMPLOYEE",
      details: `Registered ${role} for restaurant ${currentUser.restaurantId}`,
    },
  });

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    restaurantId: user.restaurantId,
    branchId: user.branchId,
    status: user.status,
  };
};

export const loginUser = async ({ email, password }) => {
  const normalizedEmail = email?.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    include: { restaurant: true, branch: true },
  });

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  if (user.status !== "ACTIVE") {
    throw new ApiError(403, "Account is inactive");
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: "LOGIN",
      details: "User logged in successfully",
    },
  });

  const { passwordHash, ...safeUser } = user;
  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
    restaurantId: user.restaurantId,
    branchId: user.branchId,
  });

  return {
    user: safeUser,
    token,
  };
};






