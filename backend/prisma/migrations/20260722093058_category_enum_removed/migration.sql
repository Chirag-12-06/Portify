/*
  Warnings:

  - The values [OTHER] on the enum `SkillCategory` will be removed. If these variants are still used in the database, this will fail.
  - The values [OTHER,CS_FUNDAMENTALS] on the enum `TechCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SkillCategory_new" AS ENUM ('SOFTWARE_DEVELOPMENT', 'DATA_SCIENCE', 'MACHINE_LEARNING', 'ARTIFICIAL_INTELLIGENCE', 'DATABASES', 'DEVOPS', 'CLOUD', 'VERSION_CONTROL', 'TESTING', 'UI_UX', 'SOFT_SKILLS');
ALTER TABLE "Skill" ALTER COLUMN "category" TYPE "SkillCategory_new" USING ("category"::text::"SkillCategory_new");
ALTER TYPE "SkillCategory" RENAME TO "SkillCategory_old";
ALTER TYPE "SkillCategory_new" RENAME TO "SkillCategory";
DROP TYPE "public"."SkillCategory_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TechCategory_new" AS ENUM ('FRONTEND', 'BACKEND', 'DATABASE', 'LANGUAGE', 'FRAMEWORK', 'DEVOPS', 'CLOUD', 'TOOLS', 'ML_AI', 'DATA_ANALYSIS', 'DATA_VISUALIZATION');
ALTER TABLE "Tech" ALTER COLUMN "category" TYPE "TechCategory_new" USING ("category"::text::"TechCategory_new");
ALTER TYPE "TechCategory" RENAME TO "TechCategory_old";
ALTER TYPE "TechCategory_new" RENAME TO "TechCategory";
DROP TYPE "public"."TechCategory_old";
COMMIT;
