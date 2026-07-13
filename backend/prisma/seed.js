import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be defined in .env");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    console.log("Admin user created successfully.");
  } else {
    console.log("Admin user already exists.");
  }

  const existingProfile = await prisma.profile.findFirst();

  if (!existingProfile) {
    await prisma.profile.create({
      data: {
        name: "",
        title: "",
        about: "",
        email: process.env.ADMIN_EMAIL,
      },
    });
    console.log("Profile created successfully.");
  } else {
    console.log("Profile already exists.");
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
