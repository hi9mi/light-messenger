/*
  Warnings:

  - The primary key for the `Participants` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Participants` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[dialog_id]` on the table `Participants` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Participants` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Participants_id_key";

-- AlterTable
ALTER TABLE "Participants" DROP CONSTRAINT "Participants_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "Participants_dialog_id_key" ON "Participants"("dialog_id");

-- CreateIndex
CREATE UNIQUE INDEX "Participants_user_id_key" ON "Participants"("user_id");
