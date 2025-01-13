/*
  Warnings:

  - A unique constraint covering the columns `[price]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Subscription_price_key" ON "Subscription"("price");
