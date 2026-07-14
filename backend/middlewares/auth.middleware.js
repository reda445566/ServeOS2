import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

const authMiddleware = async (req, res, next) => {
    try {
        // الحصول على التوكن من الكوكي أو الهيدر
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Authentication required");
        }

        // التحقق من صحة التوكن
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ======================================================
        // هنا بعد ما نستخدم Prisma هنجيب اليوزر من الداتا بيز
        //
        // const user = await prisma.user.findUnique({
        //   where: { id: decoded.id }
        // });
        //
        // لو اليوزر مش موجود
        // throw new ApiError(401, "User not found");
        //
        // req.user = user;
        // ======================================================

        // مؤقتًا
        req.user = decoded;

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