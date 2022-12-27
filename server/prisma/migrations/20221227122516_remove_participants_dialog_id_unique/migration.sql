/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Participants` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Participants_dialog_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Participants_user_id_key" ON "Participants"("user_id");
