export type DomainId = string;

export const eventStatuses = ["DRAFT", "PLANNING", "APPROVED", "ARCHIVED"] as const;
export type EventStatus = (typeof eventStatuses)[number];

export const participantKinds = ["INDIVIDUAL", "RELAY"] as const;
export type ParticipantKind = (typeof participantKinds)[number];

export const participantStatuses = ["REGISTERED", "DNS", "WITHDRAWN"] as const;
export type ParticipantStatus = (typeof participantStatuses)[number];

export const scenarioStatuses = ["DRAFT", "REVIEW", "APPROVED", "ARCHIVED"] as const;
export type ScenarioStatus = (typeof scenarioStatuses)[number];

export const laneStatuses = ["AVAILABLE", "RESERVED", "BLOCKED"] as const;
export type LaneStatus = (typeof laneStatuses)[number];

export const assignmentSources = ["AUTOMATIC", "MANUAL", "IMPORT"] as const;
export type AssignmentSource = (typeof assignmentSources)[number];

export const importStatuses = ["PENDING", "COMPLETED", "FAILED"] as const;
export type ImportStatus = (typeof importStatuses)[number];

export const overrideScopes = [
  "EVENT",
  "SCENARIO",
  "PARTICIPANT",
  "START_GROUP",
  "WAVE",
  "LANE",
  "LANE_ASSIGNMENT",
] as const;
export type OverrideScope = (typeof overrideScopes)[number];

export type EventContract = {
  id: DomainId;
  name: string;
  eventDate: string;
  location?: string;
  status: EventStatus;
  startWindowStart?: string;
  startWindowEnd?: string;
};

export type ParticipantContract = {
  id: DomainId;
  eventId: DomainId;
  startGroupId?: DomainId;
  externalId?: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  kind: ParticipantKind;
  status: ParticipantStatus;
  category?: string;
  distance?: string;
};

export type StartGroupContract = {
  id: DomainId;
  eventId: DomainId;
  code: string;
  name: string;
  category?: string;
  distance?: string;
  sortOrder: number;
};

export type LaneContract = {
  id: DomainId;
  eventId: DomainId;
  number: number;
  name?: string;
  status: LaneStatus;
  maxStarts?: number;
};

export type PlanningScenarioContract = {
  id: DomainId;
  eventId: DomainId;
  name: string;
  status: ScenarioStatus;
  version: number;
  lockedAt?: string;
  approvedAt?: string;
};

export type WaveContract = {
  id: DomainId;
  planningScenarioId: DomainId;
  code: string;
  name?: string;
  plannedStartTime?: string;
  expectedStarts?: number;
  maxStarts?: number;
  sortOrder: number;
};

export type LaneAssignmentContract = {
  id: DomainId;
  waveId: DomainId;
  laneId: DomainId;
  participantId?: DomainId;
  startGroupId?: DomainId;
  source: AssignmentSource;
  position?: number;
  notes?: string;
};

export type ManualOverrideContract = {
  id: DomainId;
  eventId: DomainId;
  planningScenarioId?: DomainId;
  scope: OverrideScope;
  targetId: DomainId;
  reason: string;
  authorName?: string;
};

export type PlanningSnapshotContract = {
  event: EventContract;
  scenario: PlanningScenarioContract;
  participants: ParticipantContract[];
  startGroups: StartGroupContract[];
  lanes: LaneContract[];
  waves: WaveContract[];
  laneAssignments: LaneAssignmentContract[];
  manualOverrides: ManualOverrideContract[];
};
