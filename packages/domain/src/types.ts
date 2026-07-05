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

export const ruleSetStatuses = ["DRAFT", "ACTIVE", "ARCHIVED"] as const;
export type RuleSetStatus = (typeof ruleSetStatuses)[number];

export const sortDirections = ["ASC", "DESC"] as const;
export type SortDirection = (typeof sortDirections)[number];

export const ruleResultStatuses = ["PASS", "WARNING", "FAIL"] as const;
export type RuleResultStatus = (typeof ruleResultStatuses)[number];

export const ruleSeverityLevels = ["INFO", "WARNING", "BLOCKING"] as const;
export type RuleSeverityLevel = (typeof ruleSeverityLevels)[number];

export const ruleTargetTypes = [
  "EVENT",
  "SCENARIO",
  "PARTICIPANT",
  "START_GROUP",
  "WAVE",
  "LANE",
  "LANE_ASSIGNMENT",
  "MANUAL_OVERRIDE",
] as const;
export type RuleTargetType = (typeof ruleTargetTypes)[number];

export type RuleTargetContract = {
  type: RuleTargetType;
  id: DomainId;
};

export type RuleCheckResultContract = {
  id: DomainId;
  ruleId: string;
  ruleName: string;
  status: RuleResultStatus;
  severity: RuleSeverityLevel;
  message: string;
  targets: RuleTargetContract[];
};

export type RuleEvaluationContract = {
  snapshotId: DomainId;
  results: RuleCheckResultContract[];
};

export type GroupingCriterionContract = {
  field: string;
  enabled: boolean;
};

export type SortingCriterionContract = {
  field: string;
  direction: SortDirection;
  enabled: boolean;
};

export type CriteriaPipelineContract = {
  grouping: GroupingCriterionContract[];
  sorting: SortingCriterionContract[];
};

export type LaneCapacityContract = {
  value: number;
  allowedMax: number;
};

export type RuleSetParametersContract = {
  laneCapacity: LaneCapacityContract;
  breakBetweenWavesMinutes: number;
};

export type RuleSetContract = {
  id: DomainId;
  eventId?: DomainId;
  name: string;
  version: number;
  status: RuleSetStatus;
  parameters: RuleSetParametersContract;
  waveCriteria: CriteriaPipelineContract;
  laneCriteria: CriteriaPipelineContract;
};

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
  ruleSetId?: DomainId;
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
  ruleSet?: RuleSetContract;
  participants: ParticipantContract[];
  startGroups: StartGroupContract[];
  lanes: LaneContract[];
  waves: WaveContract[];
  laneAssignments: LaneAssignmentContract[];
  manualOverrides: ManualOverrideContract[];
};
