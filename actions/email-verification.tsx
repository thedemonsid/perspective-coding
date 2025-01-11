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
    const res = await getVerificationTokenByToken(token);
    if (!res) {
      return {
        success: false,
        message: "Invalid token",
      };
    }
    if (res.email !== email) {
      return {
        success: false,
        message: "Invalid email",
      };
    }
    if (res.expires < new Date()) {
      return {
        success: false,
        message: "Token expired",
      };
    }
    const user = await getUserByEmail(email);
    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerified: new Date(),
      },
    });
    await prisma.verificationToken.delete({
      where: {
        id: res.id,
      },
    });
  } catch (error) {
    return {
      success: false,
      message: "Failed to verify email",
    };
  }
}
