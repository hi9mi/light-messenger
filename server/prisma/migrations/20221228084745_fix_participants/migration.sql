/*
  Warnings:

  - The primary key for the `Participants` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Participants" DROP CONSTRAINT "Participants_pkey",
ADD CONSTRAINT "Participants_pkey" PRIMARY KEY ("user_id", "dialog_id");
