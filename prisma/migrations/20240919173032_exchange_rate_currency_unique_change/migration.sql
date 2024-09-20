/*
  Warnings:

  - A unique constraint covering the columns `[currency]` on the table `exchange_rates` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `exchange_rates_currency_key` ON `exchange_rates`(`currency`);
