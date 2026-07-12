import { login } from "./auth.service.js";
import { loginSchema } from "./auth.validation.js";

export async function loginAdmin(req, res) {
  try {
    const validatedData = loginSchema.parse(req.body);

    const data = await login(validatedData.email, validatedData.password);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      ...data,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
}
