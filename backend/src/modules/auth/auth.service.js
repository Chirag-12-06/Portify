import bcrypt from "bcrypt";

import { generateToken } from "../../utils/jwt.js";
import prisma from "../../lib/prisma.js";

export async function login(email, password) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
  });

  return {
    user: {
      id: user.id,
      email: user.email,
    },
    token,
  };
}
