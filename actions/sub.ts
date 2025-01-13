import { prisma } from "@/lib/prisma";

export async function hasValidSubscription(userId: string): Promise<boolean> {
  const currentDate = new Date();

  const validSubscription = await prisma.userToSub.findFirst({
    where: {
      userId: userId,
      status: "ACTIVE",
      expiresAt: {
        gt: currentDate,
      },
    },
    orderBy: {
      expiresAt: "asc",
    },
  });

  return validSubscription !== null;
}

