import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Service for Use Registration
export const registerUserService = async (body) => {
  try {
    const { name, email, password } = body;

    // Registration Logic
    let user = await UserModel.findOne({ email });

    if (user) {
      return {
        status: 400,
        message: "User already exists",
      };
    }

    user = new UserModel({ name, email, password });
    await user.save();

    // Create JWT Payload
    const payload = { user: { id: user._id, role: user.role } };

    // Sign and return the token along with user data
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "40h",
    });

    return {
      status: 201,

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
};

// Service for User Login
export const loginUserService = async (body) => {
  try {
    const { email, password } = body;

    let user = await UserModel.findOne({ email });

    if (!user) {
      return {
        status: 400,
        message: "Invalid Credentials",
      };
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return {
        status: 400,
        message: "Invalid Credentials",
      };
    }

    // Create JWT Payload
    const payload = { user: { id: user._id, role: user.role } };

    // Sign and return the token along with user data
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "40h",
    });

    return {
      status: 201,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
};
