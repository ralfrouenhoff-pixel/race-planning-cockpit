import type {
  LaneAssignmentContract,
  LaneContract,
  ManualOverrideContract,
  ParticipantContract,
  PlanningSnapshotContract,
  RuleCheckResultContract,
} from "@race-planning-cockpit/domain";
import { referenceScenarioFixture } from "../reference-scenario";

export type EdgeCaseFixture = {
  id: string;
  title: string;
  description: string;
  expectedModelImpact: string;
  expectedRuleResults: RuleCheckResultContract[];
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
  expectedRuleResults: [
    {
      id: "rule-result-missing-category",
      ruleId: "participant.category.required",
      ruleName: "Participant category is required",
      status: "FAIL",
      severity: "BLOCKING",
      message: "Participant Starter 47 has no category.",
      targets: [{ type: "PARTICIPANT", id: "participant-individual-47" }],
    },
  ],
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
  expectedRuleResults: [
    {
      id: "rule-result-dns-after-assignment",
      ruleId: "assignment.participant.active",
      ruleName: "Assigned participant must be active",
      status: "WARNING",
      severity: "WARNING",
      message: "Participant Starter 12 is DNS after assignment planning.",
      targets: [{ type: "PARTICIPANT", id: "participant-individual-12" }],
    },
  ],
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
  expectedRuleResults: [
    {
      id: "rule-result-late-registration",
      ruleId: "participant.requires.scenario-review",
      ruleName: "Late registration requires scenario review",
      status: "WARNING",
      severity: "WARNING",
      message: "Late registration Nachmeldung 01 is not represented in the initial scenario.",
      targets: [{ type: "PARTICIPANT", id: "participant-late-01" }],
    },
  ],
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
  expectedRuleResults: [
    {
      id: "rule-result-blocked-lane",
      ruleId: "lane.assignment.available",
      ruleName: "Assigned lane must be available",
      status: "FAIL",
      severity: "BLOCKING",
      message: "Lane 6 is blocked while assignments still reference it.",
      targets: [{ type: "LANE", id: "lane-6" }],
    },
  ],
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
  expectedRuleResults: [
    {
      id: "rule-result-manual-override",
      ruleId: "override.requires.review",
      ruleName: "Manual override requires review",
      status: "WARNING",
      severity: "INFO",
      message: "Manual override is present and should be included in scenario review.",
      targets: [{ type: "MANUAL_OVERRIDE", id: "override-assignment-lane-1" }],
    },
  ],
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
