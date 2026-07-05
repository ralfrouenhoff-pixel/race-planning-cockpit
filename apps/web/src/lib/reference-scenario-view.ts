import { referenceScenarioFixture } from "@fixtures/reference-scenario";

const timeFormatter = new Intl.DateTimeFormat("de-DE", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "UTC",
});

export const overviewMetrics = [
  {
    label: "Events",
    value: "1",
    detail: referenceScenarioFixture.event.status,
  },
  {
    label: "Scenarios",
    value: "1",
    detail: referenceScenarioFixture.scenario.name,
  },
  {
    label: "Participants",
    value: String(referenceScenarioFixture.participants.length),
    detail: "Reference fixture",
  },
  {
    label: "Lanes",
    value: String(referenceScenarioFixture.lanes.length),
    detail: "Available",
  },
];

export const eventRows = [
  [
    referenceScenarioFixture.event.name,
    referenceScenarioFixture.event.status,
    "Reference fixture",
  ],
];

export const scenarioRows = [
  [
    referenceScenarioFixture.scenario.name,
    referenceScenarioFixture.scenario.status,
    `Version ${referenceScenarioFixture.scenario.version}`,
  ],
];

export const participantRows = [
  [
    "Individuals",
    String(
      referenceScenarioFixture.participants.filter(
        (participant) => participant.kind === "INDIVIDUAL",
      ).length,
    ),
    "Sprint",
  ],
  [
    "Relays",
    String(
      referenceScenarioFixture.participants.filter(
        (participant) => participant.kind === "RELAY",
      ).length,
    ),
    "Relay sprint",
  ],
  [
    "Missing category",
    String(
      referenceScenarioFixture.participants.filter(
        (participant) => participant.category === undefined,
      ).length,
    ),
    "Edge case",
  ],
  [
    "DNS",
    String(
      referenceScenarioFixture.participants.filter(
        (participant) => participant.status === "DNS",
      ).length,
    ),
    "Post-assignment edge case",
  ],
];

export const waveRows = referenceScenarioFixture.waves.map((wave) => [
  wave.code,
  wave.plannedStartTime
    ? timeFormatter.format(new Date(wave.plannedStartTime))
    : "Not scheduled",
  wave.name ?? "Unnamed wave",
]);

export const laneRows = referenceScenarioFixture.lanes.map((lane) => [
  lane.name ?? `Lane ${lane.number}`,
  lane.status,
  `${lane.maxStarts ?? 0} starts per wave`,
]);

export const simulationRows = [
  ["SimulationRun", "Not modeled", "Pending result contract"],
  ["RuleCheckResult", "Not modeled", "Pending result contract"],
  ["Snapshot", "Contract prepared", "Domain package"],
  [
    "Fixture",
    "Prepared",
    `${referenceScenarioFixture.snapshot.participants.length} participants`,
  ],
];
