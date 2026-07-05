import type {
  LaneAssignmentContract,
  LaneContract,
  ManualOverrideContract,
  ParticipantContract,
  PlanningSnapshotContract,
} from "@race-planning-cockpit/domain";
import { referenceScenarioFixture } from "../reference-scenario";

export type EdgeCaseFixture = {
  id: string;
  title: string;
  description: string;
  expectedModelImpact: string;
  snapshot: PlanningSnapshotContract;
};

const base = referenceScenarioFixture;

const normalizedParticipants = base.participants.map((participant) => ({
  ...participant,
  status: "REGISTERED" as const,
  category:
    participant.category ??
    base.startGroups.find((group) => group.id === participant.startGroupId)?.category,
}));

const snapshotWith = ({
  laneAssignments = base.laneAssignments,
  lanes = base.lanes,
  manualOverrides = base.manualOverrides,
  participants = normalizedParticipants,
}: {
  laneAssignments?: LaneAssignmentContract[];
  lanes?: LaneContract[];
  manualOverrides?: ManualOverrideContract[];
  participants?: ParticipantContract[];
}): PlanningSnapshotContract => ({
  event: base.event,
  scenario: base.scenario,
  participants,
  startGroups: base.startGroups,
  lanes,
  waves: base.waves,
  laneAssignments,
  manualOverrides,
});

export const missingCategoryFixture: EdgeCaseFixture = {
  id: "missing-category",
  title: "Participant without category",
  description:
    "A registered individual participant is imported without a category value.",
  expectedModelImpact:
    "Participant remains persisted and can be referenced by later rule checks.",
  snapshot: snapshotWith({
    participants: normalizedParticipants.map((participant) =>
      participant.id === "participant-individual-47"
        ? { ...participant, category: undefined }
        : participant,
    ),
  }),
};

export const dnsAfterAssignmentFixture: EdgeCaseFixture = {
  id: "dns-after-assignment",
  title: "DNS after lane assignment",
  description:
    "A participant is marked DNS after the initial scenario and lane structure exist.",
  expectedModelImpact:
    "Participant status changes while the scenario structure remains auditable.",
  snapshot: snapshotWith({
    participants: normalizedParticipants.map((participant) =>
      participant.id === "participant-individual-12"
        ? { ...participant, status: "DNS" }
        : participant,
    ),
  }),
};

export const lateRegistrationFixture: EdgeCaseFixture = {
  id: "late-registration",
  title: "Late registration after initial planning",
  description:
    "A new participant appears after the initial scenario has already been created.",
  expectedModelImpact:
    "Participant can be represented without mutating an approved scenario silently.",
  snapshot: snapshotWith({
    participants: [
      ...normalizedParticipants,
      {
        id: "participant-late-01",
        eventId: base.event.id,
        startGroupId: "group-adult-sprint",
        externalId: "LATE-001",
        displayName: "Nachmeldung 01",
        kind: "INDIVIDUAL",
        status: "REGISTERED",
        category: "Erwachsene",
        distance: "Sprint",
      },
    ],
  }),
};

export const blockedLaneFixture: EdgeCaseFixture = {
  id: "blocked-lane",
  title: "Lane blocked after planning",
  description:
    "A lane becomes unavailable while the initial lane assignment structure exists.",
  expectedModelImpact:
    "Lane status changes independently from existing assignments and can trigger later review.",
  snapshot: snapshotWith({
    lanes: base.lanes.map((lane) =>
      lane.id === "lane-6" ? { ...lane, status: "BLOCKED" } : lane,
    ),
  }),
};

export const manualOverrideFixture: EdgeCaseFixture = {
  id: "manual-override",
  title: "Manual override with reason",
  description:
    "A planner manually overrides an assignment-relevant planning decision.",
  expectedModelImpact:
    "Override is stored as an auditable decision with scope, target and reason.",
  snapshot: snapshotWith({
    manualOverrides: [
      {
        id: "override-assignment-lane-1",
        eventId: base.event.id,
        planningScenarioId: base.scenario.id,
        scope: "LANE_ASSIGNMENT",
        targetId: "assignment-w1-lane-1",
        reason: "Operational correction for reference scenario review.",
        authorName: "Planning Lead",
      },
    ],
  }),
};

export const edgeCaseFixtures: EdgeCaseFixture[] = [
  missingCategoryFixture,
  dnsAfterAssignmentFixture,
  lateRegistrationFixture,
  blockedLaneFixture,
  manualOverrideFixture,
];
