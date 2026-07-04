-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('DRAFT', 'PLANNING', 'APPROVED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ParticipantKind" AS ENUM ('INDIVIDUAL', 'RELAY');

-- CreateEnum
CREATE TYPE "ParticipantStatus" AS ENUM ('REGISTERED', 'DNS', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "ScenarioStatus" AS ENUM ('DRAFT', 'REVIEW', 'APPROVED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "LaneStatus" AS ENUM ('AVAILABLE', 'RESERVED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "AssignmentSource" AS ENUM ('AUTOMATIC', 'MANUAL', 'IMPORT');

-- CreateEnum
CREATE TYPE "ImportStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "OverrideScope" AS ENUM ('EVENT', 'SCENARIO', 'PARTICIPANT', 'START_GROUP', 'WAVE', 'LANE', 'LANE_ASSIGNMENT');

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "status" "EventStatus" NOT NULL DEFAULT 'DRAFT',
    "startWindowStart" TIMESTAMP(3),
    "startWindowEnd" TIMESTAMP(3),
    "configuration" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "importBatchId" TEXT,
    "startGroupId" TEXT,
    "externalId" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "displayName" TEXT NOT NULL,
    "kind" "ParticipantKind" NOT NULL DEFAULT 'INDIVIDUAL',
    "status" "ParticipantStatus" NOT NULL DEFAULT 'REGISTERED',
    "category" TEXT,
    "distance" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StartGroup" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "distance" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StartGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanningScenario" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "ScenarioStatus" NOT NULL DEFAULT 'DRAFT',
    "version" INTEGER NOT NULL DEFAULT 1,
    "lockedAt" TIMESTAMP(3),
    "approvedAt" TIMESTAMP(3),
    "notes" TEXT,
    "snapshot" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanningScenario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wave" (
    "id" TEXT NOT NULL,
    "planningScenarioId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT,
    "plannedStartTime" TIMESTAMP(3),
    "expectedStarts" INTEGER,
    "maxStarts" INTEGER,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wave_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lane" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "name" TEXT,
    "status" "LaneStatus" NOT NULL DEFAULT 'AVAILABLE',
    "maxStarts" INTEGER,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lane_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LaneAssignment" (
    "id" TEXT NOT NULL,
    "waveId" TEXT NOT NULL,
    "laneId" TEXT NOT NULL,
    "participantId" TEXT,
    "startGroupId" TEXT,
    "source" "AssignmentSource" NOT NULL DEFAULT 'AUTOMATIC',
    "position" INTEGER,
    "notes" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LaneAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImportBatch" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "sourceName" TEXT NOT NULL,
    "sourceType" TEXT NOT NULL,
    "status" "ImportStatus" NOT NULL DEFAULT 'PENDING',
    "importedAt" TIMESTAMP(3),
    "summary" JSONB,
    "errorDetails" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImportBatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManualOverride" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "planningScenarioId" TEXT,
    "scope" "OverrideScope" NOT NULL,
    "targetId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "authorName" TEXT,
    "context" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ManualOverride_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Event_eventDate_idx" ON "Event"("eventDate");

-- CreateIndex
CREATE INDEX "Event_status_idx" ON "Event"("status");

-- CreateIndex
CREATE INDEX "Participant_eventId_idx" ON "Participant"("eventId");

-- CreateIndex
CREATE INDEX "Participant_startGroupId_idx" ON "Participant"("startGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_eventId_externalId_key" ON "Participant"("eventId", "externalId");

-- CreateIndex
CREATE INDEX "StartGroup_eventId_idx" ON "StartGroup"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "StartGroup_eventId_code_key" ON "StartGroup"("eventId", "code");

-- CreateIndex
CREATE INDEX "PlanningScenario_eventId_idx" ON "PlanningScenario"("eventId");

-- CreateIndex
CREATE INDEX "PlanningScenario_status_idx" ON "PlanningScenario"("status");

-- CreateIndex
CREATE UNIQUE INDEX "PlanningScenario_eventId_name_version_key" ON "PlanningScenario"("eventId", "name", "version");

-- CreateIndex
CREATE INDEX "Wave_planningScenarioId_idx" ON "Wave"("planningScenarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Wave_planningScenarioId_code_key" ON "Wave"("planningScenarioId", "code");

-- CreateIndex
CREATE INDEX "Lane_eventId_idx" ON "Lane"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "Lane_eventId_number_key" ON "Lane"("eventId", "number");

-- CreateIndex
CREATE INDEX "LaneAssignment_laneId_idx" ON "LaneAssignment"("laneId");

-- CreateIndex
CREATE INDEX "LaneAssignment_participantId_idx" ON "LaneAssignment"("participantId");

-- CreateIndex
CREATE INDEX "LaneAssignment_startGroupId_idx" ON "LaneAssignment"("startGroupId");

-- CreateIndex
CREATE INDEX "LaneAssignment_waveId_idx" ON "LaneAssignment"("waveId");

-- CreateIndex
CREATE INDEX "ImportBatch_eventId_idx" ON "ImportBatch"("eventId");

-- CreateIndex
CREATE INDEX "ImportBatch_status_idx" ON "ImportBatch"("status");

-- CreateIndex
CREATE INDEX "ManualOverride_eventId_idx" ON "ManualOverride"("eventId");

-- CreateIndex
CREATE INDEX "ManualOverride_planningScenarioId_idx" ON "ManualOverride"("planningScenarioId");

-- CreateIndex
CREATE INDEX "ManualOverride_scope_targetId_idx" ON "ManualOverride"("scope", "targetId");

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_importBatchId_fkey" FOREIGN KEY ("importBatchId") REFERENCES "ImportBatch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_startGroupId_fkey" FOREIGN KEY ("startGroupId") REFERENCES "StartGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StartGroup" ADD CONSTRAINT "StartGroup_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanningScenario" ADD CONSTRAINT "PlanningScenario_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wave" ADD CONSTRAINT "Wave_planningScenarioId_fkey" FOREIGN KEY ("planningScenarioId") REFERENCES "PlanningScenario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lane" ADD CONSTRAINT "Lane_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaneAssignment" ADD CONSTRAINT "LaneAssignment_laneId_fkey" FOREIGN KEY ("laneId") REFERENCES "Lane"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaneAssignment" ADD CONSTRAINT "LaneAssignment_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaneAssignment" ADD CONSTRAINT "LaneAssignment_startGroupId_fkey" FOREIGN KEY ("startGroupId") REFERENCES "StartGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaneAssignment" ADD CONSTRAINT "LaneAssignment_waveId_fkey" FOREIGN KEY ("waveId") REFERENCES "Wave"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImportBatch" ADD CONSTRAINT "ImportBatch_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManualOverride" ADD CONSTRAINT "ManualOverride_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManualOverride" ADD CONSTRAINT "ManualOverride_planningScenarioId_fkey" FOREIGN KEY ("planningScenarioId") REFERENCES "PlanningScenario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

