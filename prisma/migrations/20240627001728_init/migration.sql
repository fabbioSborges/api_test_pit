-- AlterTable
ALTER TABLE "Answers" ALTER COLUMN "correct" SET DATA TYPE TEXT,
ALTER COLUMN "alternative" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Questions" ALTER COLUMN "correct" SET DATA TYPE TEXT;
