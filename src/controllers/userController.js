import {
  loginUserService,
  registerUserService,
} from "../services/userService.js";

// Controller function to register an user
export const registerUser = async (req, res) => {
  const result = await registerUserService(req.body);
  return res.status(result.status).json(result);
};

// Controller function to login the user
export const LoginUser = async (req, res) => {
  const result = await loginUserService(req.body);
  return res.status(result.status).json(result);
};
