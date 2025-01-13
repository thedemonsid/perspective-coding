/*
  Warnings:

  - You are about to drop the `USerToSub` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "USerToSub" DROP CONSTRAINT "USerToSub_subscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "USerToSub" DROP CONSTRAINT "USerToSub_userId_fkey";

-- DropTable
DROP TABLE "USerToSub";

-- CreateTable
CREATE TABLE "user_to_sub" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL DEFAULT 'INACTIVE',
    "userId" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_to_sub_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_to_sub" ADD CONSTRAINT "user_to_sub_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_sub" ADD CONSTRAINT "user_to_sub_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
