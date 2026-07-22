-- CreateTable
CREATE TABLE "ProjectTech" (
    "projectId" TEXT NOT NULL,
    "techId" TEXT NOT NULL,

    CONSTRAINT "ProjectTech_pkey" PRIMARY KEY ("projectId","techId")
);

-- AddForeignKey
ALTER TABLE "ProjectTech" ADD CONSTRAINT "ProjectTech_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTech" ADD CONSTRAINT "ProjectTech_techId_fkey" FOREIGN KEY ("techId") REFERENCES "Tech"("id") ON DELETE CASCADE ON UPDATE CASCADE;
