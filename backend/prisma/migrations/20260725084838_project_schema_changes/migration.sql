/*
  Warnings:

  - The values [ONGOING] on the enum `ProjectStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `projectYear` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailUrl` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProjectStatus_new" AS ENUM ('COMPLETED', 'IN_PROGRESS');
ALTER TABLE "Project" ALTER COLUMN "status" TYPE "ProjectStatus_new" USING ("status"::text::"ProjectStatus_new");
ALTER TYPE "ProjectStatus" RENAME TO "ProjectStatus_old";
ALTER TYPE "ProjectStatus_new" RENAME TO "ProjectStatus";
DROP TYPE "public"."ProjectStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "projectYear" INTEGER NOT NULL,
ADD COLUMN     "thumbnailUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProjectImage" ADD COLUMN     "caption" TEXT;
