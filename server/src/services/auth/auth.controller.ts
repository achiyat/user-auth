// server/src/services/auth/auth.controller.ts
import { Request, Response } from "express";
import User from "../../models/User";
import AuthService from "./auth.service";
import authResponse from "./auth.response";

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = await AuthService.register(username, email, password);

    const response = await authResponse.response(
      201,
      "User created successfully",
      { user }
    );
    res.status(response.status.code).json(response);
  } catch (error) {
    const response = await authResponse.response(
      400,
      "Error in registration",
      error
    );
    res.status(response.status.code).json(response);
  }
};

// Login a user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await AuthService.login(email, password);
    const user = await User.findOne({ email });

    const response = await authResponse.response(200, "Login successful", {
      token,
    });
    res.status(response.status.code).json(response);
  } catch (error) {
    const response = await authResponse.response(401, "Error in login", error);
    res.status(response.status.code).json(response);
  }
};

// Logout a user
export const logout = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;

    const response = await authResponse.response(
      200,
      "Logged out successfully",
      null
    );
    res.status(response.status.code).json(response);
  } catch (error) {
    const response = await authResponse.response(400, "Error in logout", error);
    res.status(response.status.code).json(response);
  }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      const response = await authResponse.response(404, "User not found", null);
      res.status(response.status.code).json(response);
    } else {
      const response = await authResponse.response(
        200,
        "User retrieved successfully",
        { user }
      );
      res.status(response.status.code).json(response);
    }
  } catch (error) {
    const response = await authResponse.response(
      500,
      "Internal Server Error",
      error
    );
    res.status(response.status.code).json(response);
  }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    const response = await authResponse.response(
      200,
      "Users retrieved successfully",
      { users }
    );
    res.status(response.status.code).json(response);
  } catch (error) {
    const response = await authResponse.response(
      400,
      "Error retrieving users",
      error
    );
    res.status(response.status.code).json(response);
  }
};

// Get the profile of the currently authenticated user
export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;

    const response = await authResponse.response(
      200,
      "Profile fetched successfully",
      { user }
    );
    res.status(response.status.code).json(response);
  } catch (error) {
    const response = await authResponse.response(
      500,
      "Error fetching profile",
      error
    );
    res.status(response.status.code).json(response);
  }
};

// Function to return protected content
export const getProtectedContent = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;
    const response = await authResponse.response(
      200,
      "Protected content accessed successfully",
      { user }
    );
    res.status(response.status.code).json(response);
  } catch (error) {
    const response = await authResponse.response(
      500,
      "Error accessing protected content",
      error
    );
    res.status(response.status.code).json(response);
  }
};
