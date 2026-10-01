-- CreateEnum
CREATE TYPE "Institution" AS ENUM ('SCHOOL', 'COLLEGE');

-- Rename existing column without losing data
ALTER TABLE "Education"
RENAME COLUMN "institution" TO "institutionName";

-- Add the new institutionType column
ALTER TABLE "Education"
ADD COLUMN "institutionType" "Institution" NOT NULL DEFAULT 'COLLEGE';