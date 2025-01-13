/*
  Warnings:

  - You are about to drop the column `startedAt` on the `user_to_sub` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `user_to_sub` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_to_sub" DROP COLUMN "startedAt",
ADD COLUMN     "orderId" TEXT NOT NULL;
