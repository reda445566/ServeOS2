import prisma from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";
import { verifyToken } from "../utils/jwt.js";

const authMiddleware = async (req, res, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Authentication required");
        }

        const decoded = verifyToken(token);
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            include: { restaurant: true, branch: true },
        });

        if (!user) {
            throw new ApiError(401, "User not found");
        }

        if (user.status !== "ACTIVE") {
            throw new ApiError(401, "User is inactive");
        }

        const { passwordHash, ...safeUser } = user;
        req.user = safeUser;

        next();
    } catch (error) {
        next(
            error instanceof ApiError
                ? error
                : new ApiError(401, "Invalid or expired token")
        );
    }
};

export default authMiddleware;

