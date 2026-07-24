import { describe, expect, it } from "vitest";
import { hasRole } from "./authorization";

describe("hasRole", () => {
  it("allows a role present in the allowed list", () => {
    expect(hasRole("GESTOR", ["GESTOR"])).toBe(true);
  });

  it("denies a role absent from the allowed list", () => {
    expect(hasRole("FUNCIONARIO", ["GESTOR"])).toBe(false);
  });

  it("allows any role when the allowed list has multiple entries", () => {
    expect(hasRole("FUNCIONARIO", ["GESTOR", "FUNCIONARIO"])).toBe(true);
  });

  it("denies when the allowed list is empty", () => {
    expect(hasRole("GESTOR", [])).toBe(false);
  });
});
