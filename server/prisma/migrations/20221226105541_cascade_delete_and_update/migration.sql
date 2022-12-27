-- DropForeignKey
ALTER TABLE "Participants" DROP CONSTRAINT "Participants_dialog_id_fkey";

-- DropForeignKey
ALTER TABLE "Participants" DROP CONSTRAINT "Participants_user_id_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_dialog_id_fkey";

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_dialog_id_fkey" FOREIGN KEY ("dialog_id") REFERENCES "dialogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participants" ADD CONSTRAINT "Participants_dialog_id_fkey" FOREIGN KEY ("dialog_id") REFERENCES "dialogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participants" ADD CONSTRAINT "Participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
