import { describe, expect, it } from "vitest";
import { distributeEvenRemainder, EVEN_REMAINDER_V1 } from "./even-remainder";

describe("distributeEvenRemainder", () => {
  it("matches the documented example: 49 participants across 5 lanes", () => {
    const result = distributeEvenRemainder(49, 5);

    expect(result.algorithm).toBe(EVEN_REMAINDER_V1);
    expect(result.laneCounts).toEqual([10, 10, 10, 10, 9]);
  });

  it("distributes evenly when participant count is a multiple of lane count", () => {
    expect(distributeEvenRemainder(50, 5).laneCounts).toEqual([10, 10, 10, 10, 10]);
  });

  it("assigns the remainder to the first lanes in order", () => {
    expect(distributeEvenRemainder(7, 5).laneCounts).toEqual([2, 2, 1, 1, 1]);
  });

  it("handles fewer participants than lanes", () => {
    expect(distributeEvenRemainder(3, 5).laneCounts).toEqual([1, 1, 1, 0, 0]);
  });

  it("handles zero participants", () => {
    expect(distributeEvenRemainder(0, 5).laneCounts).toEqual([0, 0, 0, 0, 0]);
  });

  it("handles a single lane", () => {
    expect(distributeEvenRemainder(12, 1).laneCounts).toEqual([12]);
  });

  it("always distributes exactly the given participant count", () => {
    for (const participantCount of [0, 1, 4, 5, 6, 49, 100]) {
      const result = distributeEvenRemainder(participantCount, 5);
      const total = result.laneCounts.reduce((sum, count) => sum + count, 0);
      expect(total).toBe(participantCount);
    }
  });

  it("rejects a non-positive lane count", () => {
    expect(() => distributeEvenRemainder(10, 0)).toThrow(RangeError);
  });

  it("rejects a negative participant count", () => {
    expect(() => distributeEvenRemainder(-1, 5)).toThrow(RangeError);
  });

  it("rejects non-integer input", () => {
    expect(() => distributeEvenRemainder(10.5, 5)).toThrow(RangeError);
    expect(() => distributeEvenRemainder(10, 5.5)).toThrow(RangeError);
  });
});
