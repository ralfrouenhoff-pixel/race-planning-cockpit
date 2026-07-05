import type {
  EventContract,
  LaneAssignmentContract,
  LaneContract,
  ManualOverrideContract,
  ParticipantContract,
  PlanningScenarioContract,
  PlanningSnapshotContract,
  StartGroupContract,
  WaveContract,
} from "@race-planning-cockpit/domain";

export type ReferenceScenarioFixture = {
  event: EventContract;
  scenario: PlanningScenarioContract;
  participants: ParticipantContract[];
  startGroups: StartGroupContract[];
  lanes: LaneContract[];
  waves: WaveContract[];
  laneAssignments: LaneAssignmentContract[];
  manualOverrides: ManualOverrideContract[];
  snapshot: PlanningSnapshotContract;
};

const event: EventContract = {
  id: "event-stadtwerke-sprint-2027",
  name: "Stadtwerke Sprint Triathlon 2027",
  eventDate: "2027-06-12",
  location: "Musterstadt Hallenbad",
  status: "DRAFT",
  startWindowStart: "2027-06-12T08:00:00.000Z",
  startWindowEnd: "2027-06-12T12:00:00.000Z",
};

const startGroups: StartGroupContract[] = [
  {
    id: "group-youth-sprint",
    eventId: event.id,
    code: "YOUTH-SPRINT",
    name: "Jugend Sprint",
    category: "Jugend",
    distance: "Sprint",
    sortOrder: 1,
  },
  {
    id: "group-adult-sprint",
    eventId: event.id,
    code: "ADULT-SPRINT",
    name: "Erwachsene Sprint",
    category: "Erwachsene",
    distance: "Sprint",
    sortOrder: 2,
  },
  {
    id: "group-masters-sprint",
    eventId: event.id,
    code: "MASTERS-SPRINT",
    name: "Masters Sprint",
    category: "Masters",
    distance: "Sprint",
    sortOrder: 3,
  },
  {
    id: "group-relay-sprint",
    eventId: event.id,
    code: "RELAY-SPRINT",
    name: "Staffel-Sprint",
    distance: "Staffel-Sprint",
    sortOrder: 4,
  },
];

const scenario: PlanningScenarioContract = {
  id: "scenario-initial-draft",
  eventId: event.id,
  name: "Initial Draft",
  status: "DRAFT",
  version: 1,
};

const lanes: LaneContract[] = Array.from({ length: 6 }, (_, index) => ({
  id: `lane-${index + 1}`,
  eventId: event.id,
  number: index + 1,
  name: `Lane ${index + 1}`,
  status: "AVAILABLE",
  maxStarts: 2,
}));

const waves: WaveContract[] = [
  {
    id: "wave-w1",
    planningScenarioId: scenario.id,
    code: "W1",
    name: "Jugend Sprint",
    plannedStartTime: "2027-06-12T08:00:00.000Z",
    expectedStarts: 12,
    maxStarts: 12,
    sortOrder: 1,
  },
  {
    id: "wave-w2",
    planningScenarioId: scenario.id,
    code: "W2",
    name: "Erwachsene Sprint",
    plannedStartTime: "2027-06-12T08:20:00.000Z",
    expectedStarts: 12,
    maxStarts: 12,
    sortOrder: 2,
  },
  {
    id: "wave-w3",
    planningScenarioId: scenario.id,
    code: "W3",
    name: "Erwachsene Sprint",
    plannedStartTime: "2027-06-12T08:40:00.000Z",
    expectedStarts: 12,
    maxStarts: 12,
    sortOrder: 3,
  },
  {
    id: "wave-w4",
    planningScenarioId: scenario.id,
    code: "W4",
    name: "Masters Sprint",
    plannedStartTime: "2027-06-12T09:00:00.000Z",
    expectedStarts: 12,
    maxStarts: 12,
    sortOrder: 4,
  },
  {
    id: "wave-w5",
    planningScenarioId: scenario.id,
    code: "W5",
    name: "Staffel-Sprint",
    plannedStartTime: "2027-06-12T09:20:00.000Z",
    expectedStarts: 6,
    maxStarts: 12,
    sortOrder: 5,
  },
];

const individualParticipants: ParticipantContract[] = Array.from(
  { length: 48 },
  (_, index) => {
    const number = index + 1;
    const group =
      number <= 12
        ? startGroups[0]
        : number <= 36
          ? startGroups[1]
          : startGroups[2];

    return {
      id: `participant-individual-${String(number).padStart(2, "0")}`,
      eventId: event.id,
      startGroupId: group.id,
      externalId: `IND-${String(number).padStart(3, "0")}`,
      displayName: `Starter ${String(number).padStart(2, "0")}`,
      kind: "INDIVIDUAL",
      status: number === 48 ? "DNS" : "REGISTERED",
      category: number === 47 ? undefined : group.category,
      distance: "Sprint",
    };
  },
);

const relayParticipants: ParticipantContract[] = Array.from(
  { length: 6 },
  (_, index) => {
    const number = index + 1;

    return {
      id: `participant-relay-${String(number).padStart(2, "0")}`,
      eventId: event.id,
      startGroupId: "group-relay-sprint",
      externalId: `REL-${String(number).padStart(3, "0")}`,
      displayName: `Staffel ${String(number).padStart(2, "0")}`,
      kind: "RELAY",
      status: "REGISTERED",
      distance: "Staffel-Sprint",
    };
  },
);

const participants = [...individualParticipants, ...relayParticipants];

const laneAssignments: LaneAssignmentContract[] = [
  ...lanes.map((lane) => ({
    id: `assignment-w1-${lane.id}`,
    waveId: "wave-w1",
    laneId: lane.id,
    startGroupId: "group-youth-sprint",
    source: "AUTOMATIC" as const,
    position: lane.number,
  })),
  ...lanes.map((lane) => ({
    id: `assignment-w2-${lane.id}`,
    waveId: "wave-w2",
    laneId: lane.id,
    startGroupId: "group-adult-sprint",
    source: "AUTOMATIC" as const,
    position: lane.number,
  })),
  ...lanes.map((lane) => ({
    id: `assignment-w3-${lane.id}`,
    waveId: "wave-w3",
    laneId: lane.id,
    startGroupId: "group-adult-sprint",
    source: "AUTOMATIC" as const,
    position: lane.number,
  })),
  ...lanes.map((lane) => ({
    id: `assignment-w4-${lane.id}`,
    waveId: "wave-w4",
    laneId: lane.id,
    startGroupId: "group-masters-sprint",
    source: "AUTOMATIC" as const,
    position: lane.number,
  })),
  ...lanes.slice(0, 3).map((lane) => ({
    id: `assignment-w5-${lane.id}`,
    waveId: "wave-w5",
    laneId: lane.id,
    startGroupId: "group-relay-sprint",
    source: "AUTOMATIC" as const,
    position: lane.number,
  })),
];

const manualOverrides: ManualOverrideContract[] = [];

const snapshot: PlanningSnapshotContract = {
  event,
  scenario,
  participants,
  startGroups,
  lanes,
  waves,
  laneAssignments,
  manualOverrides,
};

export const referenceScenarioFixture: ReferenceScenarioFixture = {
  event,
  scenario,
  participants,
  startGroups,
  lanes,
  waves,
  laneAssignments,
  manualOverrides,
  snapshot,
};
