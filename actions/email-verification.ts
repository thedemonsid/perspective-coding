"use server";

import { getUserByEmail } from "@/lib/db/user";
import { getVerificationTokenByToken } from "@/lib/db/verification-token";
import { prisma } from "@/lib/prisma";

export async function verifyEmail({
  token,
  email,
}: {
  token: string;
  email: string;
}) {
  try {
    const Token = await getVerificationTokenByToken(token);
    const user = await getUserByEmail(email);

    if (!Token) {
      return {
        success: false,
        message: "Invalid verification token. Please request a new one.",
      };
    }
    if (!user) {
      return {
        success: false,
        message:
          "User not found. Please check the email address and try again.",
      };
    }
    if (Token.email !== email) {
      return {
        success: false,
        message:
          "The email address does not match the token. Please check and try again.",
      };
    }

    if (Token.expires < new Date()) {
      return {
        success: false,
        message:
          "The verification token has expired. Please request a new one.",
      };
    }

    if (user.emailVerified) {
      return {
        success: false,
        message: "This email address has already been verified.",
      };
    }

    // Use a transaction to ensure atomicity
    await prisma.$transaction([
      prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      }),
      prisma.verificationToken.delete({
        where: {
          id: Token.id,
        },
      }),
    ]);

    return {
      success: true,
      message: "Your email address has been successfully verified.",
    };
  } catch (error) {
    console.error("Error verifying email:", error); // Log the error for debugging
    return {
      success: false,
      message:
        "An error occurred while verifying your email. Please try again later.",
    };
  }
}
