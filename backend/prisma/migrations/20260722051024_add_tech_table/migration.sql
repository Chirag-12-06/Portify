-- CreateEnum
CREATE TYPE "TechCategory" AS ENUM ('FRONTEND', 'BACKEND', 'DATABASE', 'LANGUAGE', 'FRAMEWORK', 'DEVOPS', 'CLOUD', 'TOOLS', 'ML_AI', 'DATA_ANALYSIS', 'DATA_VISUALIZATION', 'OTHER');

-- CreateTable
CREATE TABLE "Tech" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "TechCategory" NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "Tech_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tech_name_key" ON "Tech"("name");
