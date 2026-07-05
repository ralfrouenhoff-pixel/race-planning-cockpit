export const EVEN_REMAINDER_V1 = "EVEN_REMAINDER_V1" as const;

export type LaneDistributionResult = {
  algorithm: typeof EVEN_REMAINDER_V1;
  laneCounts: number[];
};

export function distributeEvenRemainder(
  participantCount: number,
  laneCount: number,
): LaneDistributionResult {
  if (!Number.isInteger(participantCount) || participantCount < 0) {
    throw new RangeError("participantCount must be a non-negative integer");
  }
  if (!Number.isInteger(laneCount) || laneCount <= 0) {
    throw new RangeError("laneCount must be a positive integer");
  }

  const base = Math.floor(participantCount / laneCount);
  const remainder = participantCount % laneCount;

  const laneCounts = Array.from({ length: laneCount }, (_, laneIndex) =>
    laneIndex < remainder ? base + 1 : base,
  );

  return { algorithm: EVEN_REMAINDER_V1, laneCounts };
}
