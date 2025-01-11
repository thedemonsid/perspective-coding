"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/lib/db/user";
import { generateVerificationToken } from "@/lib/db/verification-token";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { LoginSchema } from "@/zod-schema";
import { AuthError } from "next-auth";
import * as z from "zod";
import { sendVerificationEmail } from "./mail";
import bcryptjs from "bcryptjs";
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
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      success: false,
      message: "User not found",
    };
  }
  const isPasswordValid = await bcryptjs.compare(
    password,
    existingUser.password
  );
  if (!isPasswordValid) {
    return {
      success: false,
      message: "Invalid credentials",
    };
  }
  if (existingUser.emailVerified === null) {
    try {
      const token = await generateVerificationToken(email);
      console.log("Verification token", token);
      const response = await sendVerificationEmail(email, token as string);
      console.log("Email response", response);
      return {
        success: false,
        message: "Email not verified, new verification token sent",
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to generate verification token",
      };
    }
  }

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
        case "AccessDenied":
          return {
            success: false,
            message: "Email not verified",
            errors: error.message,
          };
        case "OAuthAccountNotLinked":
          return {
            success: false,
            message: "Account Already Exists with this email",
            errors: error.message,
          };
        default:
          return {
            success: false,
            message: error.message,
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
