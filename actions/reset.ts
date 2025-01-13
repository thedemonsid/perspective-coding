"use server";

// import { getUserByEmail } from "@/lib/db/user";
import { ResetPasswordSchema } from "@/zod-schema";
import * as z from "zod";

export const reset = async (values: z.infer<typeof ResetPasswordSchema>) => {
  const parsedValues = ResetPasswordSchema.safeParse(values);
  if (!parsedValues.success) {
    return {
      success: false,
      message: "Invalid input",
    };
  }
  // const { email } = parsedValues.data;
  // const existingUser = await getUserByEmail(email);
  // if (!existingUser) {
  //   return {
  //     success: false,
  //     message: "User not found",
  //   };
  // }

  // TODO: Implement password reset logic here

  return {
    success: true,
    message: "Password reset email sent",
  };
};
