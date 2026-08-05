import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function optionalProtect(
  req,
  res,
  next
) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith(
      "Bearer"
    )
  ) {
    token =
      req.headers.authorization.split(
        " "
      )[1];
  }

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user =
      await User.findById(decoded.id).select(
        "-password"
      );
  } catch {
    req.user = null;
  }

  next();
}