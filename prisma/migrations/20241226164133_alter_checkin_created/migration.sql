/*
  Warnings:

  - You are about to drop the column `creadtedAt` on the `check_ins` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "check_ins" DROP COLUMN "creadtedAt",
ADD COLUMN     "creadted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
