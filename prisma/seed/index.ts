import { PrismaClient } from "@prisma/client";
import { referenceScenarioFixture } from "../../tests/fixtures/reference-scenario";

const prisma = new PrismaClient();

async function main() {
  const {
    event,
    startGroups,
    scenario,
    lanes,
    waves,
    participants,
    laneAssignments,
    manualOverrides,
  } = referenceScenarioFixture;

  await prisma.laneAssignment.deleteMany({
    where: { wave: { planningScenario: { eventId: event.id } } },
  });
  await prisma.event.deleteMany({ where: { id: event.id } });

  await prisma.event.create({
    data: {
      id: event.id,
      name: event.name,
      eventDate: new Date(event.eventDate),
      location: event.location,
      status: event.status,
      startWindowStart: event.startWindowStart ? new Date(event.startWindowStart) : null,
      startWindowEnd: event.startWindowEnd ? new Date(event.startWindowEnd) : null,
    },
  });

  await prisma.startGroup.createMany({
    data: startGroups.map((group) => ({
      id: group.id,
      eventId: group.eventId,
      code: group.code,
      name: group.name,
      category: group.category,
      distance: group.distance,
      sortOrder: group.sortOrder,
    })),
  });

  await prisma.planningScenario.create({
    data: {
      id: scenario.id,
      eventId: scenario.eventId,
      name: scenario.name,
      status: scenario.status,
      version: scenario.version,
    },
  });

  await prisma.lane.createMany({
    data: lanes.map((lane) => ({
      id: lane.id,
      eventId: lane.eventId,
      number: lane.number,
      name: lane.name,
      status: lane.status,
      maxStarts: lane.maxStarts,
    })),
  });

  await prisma.wave.createMany({
    data: waves.map((wave) => ({
      id: wave.id,
      planningScenarioId: wave.planningScenarioId,
      code: wave.code,
      name: wave.name,
      plannedStartTime: wave.plannedStartTime ? new Date(wave.plannedStartTime) : null,
      expectedStarts: wave.expectedStarts,
      maxStarts: wave.maxStarts,
      sortOrder: wave.sortOrder,
    })),
  });

  await prisma.participant.createMany({
    data: participants.map((participant) => ({
      id: participant.id,
      eventId: participant.eventId,
      startGroupId: participant.startGroupId,
      externalId: participant.externalId,
      firstName: participant.firstName,
      lastName: participant.lastName,
      displayName: participant.displayName,
      kind: participant.kind,
      status: participant.status,
      category: participant.category,
      distance: participant.distance,
    })),
  });

  await prisma.laneAssignment.createMany({
    data: laneAssignments.map((assignment) => ({
      id: assignment.id,
      waveId: assignment.waveId,
      laneId: assignment.laneId,
      participantId: assignment.participantId,
      startGroupId: assignment.startGroupId,
      source: assignment.source,
      position: assignment.position,
      notes: assignment.notes,
    })),
  });

  if (manualOverrides.length > 0) {
    await prisma.manualOverride.createMany({
      data: manualOverrides.map((override) => ({
        id: override.id,
        eventId: override.eventId,
        planningScenarioId: override.planningScenarioId,
        scope: override.scope,
        targetId: override.targetId,
        reason: override.reason,
        authorName: override.authorName,
      })),
    });
  }

  console.log(`Seeded event "${event.name}" (${event.id})`);
  console.log(
    `  ${startGroups.length} start groups, ${lanes.length} lanes, ${waves.length} waves, ` +
      `${participants.length} participants, ${laneAssignments.length} lane assignments`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
