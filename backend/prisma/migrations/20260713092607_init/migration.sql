-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('COMPLETED', 'ONGOING');

-- CreateEnum
CREATE TYPE "SkillCategory" AS ENUM ('LANGUAGE', 'CS_FUNDAMENTALS', 'FRONTEND', 'BACKEND', 'DATABASE', 'FRAMEWORK', 'ML_AI', 'TOOLS', 'CLOUD');

-- CreateEnum
CREATE TYPE "SocialPlatform" AS ENUM ('GITHUB', 'LINKEDIN', 'LEETCODE', 'CODEFORCES', 'CODECHEF', 'HACKERRANK', 'TWITTER', 'INSTAGRAM', 'EMAIL', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "SkillCategory" NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "fullDescription" TEXT NOT NULL,
    "githubUrl" TEXT,
    "liveUrl" TEXT,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "status" "ProjectStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectImage" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ProjectImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "credentialUrl" TEXT NOT NULL,
    "badgeImageUrl" TEXT,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3),

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "location" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "currentlyWorking" BOOLEAN NOT NULL DEFAULT false,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "companyImageUrl" TEXT,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperiencePoint" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL,
    "experienceId" TEXT NOT NULL,

    CONSTRAINT "ExperiencePoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectSkill" (
    "projectId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,

    CONSTRAINT "ProjectSkill_pkey" PRIMARY KEY ("projectId","skillId")
);

-- CreateTable
CREATE TABLE "CertificateSkill" (
    "certificateId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,

    CONSTRAINT "CertificateSkill_pkey" PRIMARY KEY ("certificateId","skillId")
);

-- CreateTable
CREATE TABLE "ExperienceSkill" (
    "experienceId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,

    CONSTRAINT "ExperienceSkill_pkey" PRIMARY KEY ("experienceId","skillId")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "location" TEXT,
    "resumeUrl" TEXT,
    "profileImageUrl" TEXT,
    "heroImageUrl" TEXT,
    "tagline" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "fieldOfStudy" TEXT NOT NULL,
    "grade" TEXT,
    "location" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "currentlyStudying" BOOLEAN NOT NULL DEFAULT false,
    "institutionImageUrl" TEXT,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialLink" (
    "id" TEXT NOT NULL,
    "platform" "SocialPlatform" NOT NULL,
    "url" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL,

    CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "replied" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SocialLink_platform_key" ON "SocialLink"("platform");

-- AddForeignKey
ALTER TABLE "ProjectImage" ADD CONSTRAINT "ProjectImage_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperiencePoint" ADD CONSTRAINT "ExperiencePoint_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSkill" ADD CONSTRAINT "ProjectSkill_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSkill" ADD CONSTRAINT "ProjectSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificateSkill" ADD CONSTRAINT "CertificateSkill_certificateId_fkey" FOREIGN KEY ("certificateId") REFERENCES "Certificate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificateSkill" ADD CONSTRAINT "CertificateSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienceSkill" ADD CONSTRAINT "ExperienceSkill_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienceSkill" ADD CONSTRAINT "ExperienceSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
