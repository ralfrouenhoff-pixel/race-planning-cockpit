-- CreateEnum
CREATE TYPE "RuleSetStatus" AS ENUM ('DRAFT', 'ACTIVE', 'ARCHIVED');

-- AlterTable
ALTER TABLE "PlanningScenario" ADD COLUMN     "ruleSetId" TEXT;

-- CreateTable
CREATE TABLE "RuleSet" (
    "id" TEXT NOT NULL,
    "eventId" TEXT,
    "name" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "status" "RuleSetStatus" NOT NULL DEFAULT 'DRAFT',
    "parameters" JSONB NOT NULL,
    "waveCriteria" JSONB NOT NULL,
    "laneCriteria" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RuleSet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RuleSet_eventId_idx" ON "RuleSet"("eventId");

-- CreateIndex
CREATE INDEX "RuleSet_status_idx" ON "RuleSet"("status");

-- CreateIndex
CREATE UNIQUE INDEX "RuleSet_eventId_name_version_key" ON "RuleSet"("eventId", "name", "version");

-- CreateIndex
CREATE INDEX "PlanningScenario_ruleSetId_idx" ON "PlanningScenario"("ruleSetId");

-- AddForeignKey
ALTER TABLE "PlanningScenario" ADD CONSTRAINT "PlanningScenario_ruleSetId_fkey" FOREIGN KEY ("ruleSetId") REFERENCES "RuleSet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuleSet" ADD CONSTRAINT "RuleSet_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
