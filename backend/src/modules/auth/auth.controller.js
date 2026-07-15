import { login } from "./auth.service.js";
import { loginSchema } from "./auth.validation.js";
import { cookieOptions } from "../../config/cookie.config.js";

export async function loginAdmin(req, res) {
  try {
    const validatedData = loginSchema.parse(req.body);

    const { user, token } = await login(
      validatedData.email,
      validatedData.password,
    );

    res.cookie("accessToken", token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
}

export function logoutAdmin(req, res) {
  res.clearCookie("accessToken", cookieOptions);

  return res.json({
    success: true,
    message: "Logged out successfully",
  });
}
