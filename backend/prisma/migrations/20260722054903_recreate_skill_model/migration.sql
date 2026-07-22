/*
  Warnings:

  - The values [LANGUAGE,CS_FUNDAMENTALS,FRONTEND,BACKEND,DATABASE,FRAMEWORK,ML_AI,TOOLS,DATA_ANALYSIS,DATA_VISUALIZATION] on the enum `SkillCategory` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `imageUrl` on the `Skill` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SkillCategory_new" AS ENUM ('SOFTWARE_DEVELOPMENT', 'DATA_SCIENCE', 'MACHINE_LEARNING', 'ARTIFICIAL_INTELLIGENCE', 'DATABASES', 'DEVOPS', 'CLOUD', 'VERSION_CONTROL', 'TESTING', 'UI_UX', 'SOFT_SKILLS', 'OTHER');
ALTER TABLE "Skill" ALTER COLUMN "category" TYPE "SkillCategory_new" USING ("category"::text::"SkillCategory_new");
ALTER TYPE "SkillCategory" RENAME TO "SkillCategory_old";
ALTER TYPE "SkillCategory_new" RENAME TO "SkillCategory";
DROP TYPE "public"."SkillCategory_old";
COMMIT;

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "imageUrl";
