import asyncHandler from "../utils/asyncHandler.js";

const authorize = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!req.user) {
      res.status(401);
      throw new Error("Not authenticated.");
    }

    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error(
        "You do not have permission to access this resource."
      );
    }

    next();
  });

export default authorize;