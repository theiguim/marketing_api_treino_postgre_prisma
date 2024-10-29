/*
  Warnings:

  - You are about to drop the column `endData` on the `Campaign` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "endData",
ADD COLUMN     "endDate" TIMESTAMP(3);
