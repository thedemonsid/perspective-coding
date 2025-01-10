"use server";

import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/zod-schema";
import * as z from "zod";
import bcryptjs from "bcryptjs";
import { getUserByEmail } from "@/lib/db/user";
export async function register(values: z.infer<typeof RegisterSchema>) {
  const parsedValues = RegisterSchema.safeParse(values);
  if (!parsedValues.success) {
    return {
      success: false,
      message: "Invalid input",
      errors: parsedValues.error.errors || "Unknown error",
    };
  }
  const user = parsedValues.data;
  const userExists = await getUserByEmail(user.email);
  if (userExists) {
    return {
      success: false,
      message: "User already in Use",
    };
  }
  const hashedPassword = await bcryptjs.hash(user.password, 10);
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      password: hashedPassword,
      name: user.name,
    },
  });
  if (!newUser) {
    return {
      success: false,
      message: "Failed to create user",
    };
  }
  // TODO: Send email verification
  return {
    success: true,
    message: "Email sent for verification",
    data: parsedValues.data,
  };
}
