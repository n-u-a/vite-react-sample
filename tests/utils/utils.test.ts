import { describe, it, expect } from "vitest";
import { isNotNullish } from "@utils/utils";

describe("isNotNullish", () => {
  it("returns true for non nullish values", () => {
    expect(isNotNullish("foo")).toBe(true);
    expect(isNotNullish(0)).toBe(true);
    expect(isNotNullish(false)).toBe(true);
  });

  it("returns false for null or undefined or empty string", () => {
    expect(isNotNullish(null)).toBe(false);
    expect(isNotNullish(undefined)).toBe(false);
    expect(isNotNullish("")).toBe(false);
  });
});
