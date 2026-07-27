import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// @desc    Register user
// @route   POST /api/auth/register
export const registerUser = asyncHandler(
  async (req, res) => {
    let { name, email, password } = req.body;

    name = name?.trim();
    email = email?.trim().toLowerCase();

    if (!name || !email || !password) {
      res.status(400);
      throw new Error(
        "Please provide all required fields."
      );
    }

    if (!emailRegex.test(email)) {
      res.status(400);
      throw new Error(
        "Please enter a valid email address."
      );
    }

    if (password.length < 8) {
      res.status(400);
      throw new Error(
        "Password must be at least 8 characters long."
      );
    }

    const userExists =
      await User.findOne({
        email,
      });

    if (userExists) {
      res.status(409);
      throw new Error(
        "An account with this email already exists."
      );
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  }
);

// @desc    Login user
// @route   POST /api/auth/login
export const loginUser = asyncHandler(
  async (req, res) => {
    let { email, password } = req.body;

    email = email?.trim().toLowerCase();

    if (!email || !password) {
      res.status(400);
      throw new Error(
        "Please enter your email and password."
      );
    }

    if (!emailRegex.test(email)) {
      res.status(400);
      throw new Error(
        "Please enter a valid email address."
      );
    }

    const user =
      await User.findOne({
        email,
      });

    if (
      !user ||
      !(await user.matchPassword(password))
    ) {
      res.status(401);
      throw new Error(
        "Invalid email or password."
      );
    }

    res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  }
);

// @desc    Get logged in user
// @route   GET /api/auth/profile
export const getProfile = asyncHandler(
  async (req, res) => {
    res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });
  }
);