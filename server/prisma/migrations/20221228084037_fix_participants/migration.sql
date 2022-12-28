-- DropIndex
DROP INDEX "Participants_user_id_key";

-- AlterTable
ALTER TABLE "Participants" ADD CONSTRAINT "Participants_pkey" PRIMARY KEY ("user_id");
