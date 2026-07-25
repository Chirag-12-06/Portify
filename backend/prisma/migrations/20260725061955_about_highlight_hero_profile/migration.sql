/*
  Warnings:

  - You are about to drop the column `about` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `availability` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `heroDescription` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `heroImageUrl` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `tagline` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "about",
DROP COLUMN "availability",
DROP COLUMN "heroDescription",
DROP COLUMN "heroImageUrl",
DROP COLUMN "tagline",
DROP COLUMN "title";

-- CreateTable
CREATE TABLE "Hero" (
    "id" TEXT NOT NULL,
    "heroTitle" TEXT,
    "tagline" TEXT,
    "description" TEXT,
    "availability" TEXT,
    "heroImageUrl" TEXT,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "About" (
    "id" TEXT NOT NULL,
    "heading" TEXT,
    "content" TEXT,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Highlight" (
    "id" TEXT NOT NULL,
    "stat" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 1,
    "aboutId" TEXT NOT NULL,

    CONSTRAINT "Highlight_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hero_profileId_key" ON "Hero"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "About_profileId_key" ON "About"("profileId");

-- AddForeignKey
ALTER TABLE "Hero" ADD CONSTRAINT "Hero_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "About" ADD CONSTRAINT "About_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Highlight" ADD CONSTRAINT "Highlight_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "About"("id") ON DELETE CASCADE ON UPDATE CASCADE;
