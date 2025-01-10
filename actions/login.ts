"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { LoginSchema } from "@/zod-schema";
import { AuthError } from "next-auth";
import * as z from "zod";

export async function login(values: z.infer<typeof LoginSchema>) {
  const parsedValues = LoginSchema.safeParse(values);
  if (!parsedValues.success) {
    return {
      success: false,
      message: "Invalid input",
      errors: parsedValues.error.errors || "Unknown error",
    };
  }
  const { email, password } = parsedValues.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            message: "Invalid credentials",
            errors: error.message,
          };
        default:
          return {
            success: false,
            message: "Unknown error",
            errors: error.message,
          };
      }
    }
    throw error;
  }
  return {
    success: true,
    message: "Logged in",
    data: parsedValues.data,
  };
}
