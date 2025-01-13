/*
  Warnings:

  - You are about to drop the column `orderId` on the `user_to_sub` table. All the data in the column will be lost.
  - Added the required column `razorpayOrderId` to the `user_to_sub` table without a default value. This is not possible if the table is not empty.
  - Added the required column `razorpayPaymentId` to the `user_to_sub` table without a default value. This is not possible if the table is not empty.
  - Added the required column `razorpaySignature` to the `user_to_sub` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_to_sub" DROP COLUMN "orderId",
ADD COLUMN     "razorpayOrderId" TEXT NOT NULL,
ADD COLUMN     "razorpayPaymentId" TEXT NOT NULL,
ADD COLUMN     "razorpaySignature" TEXT NOT NULL;
