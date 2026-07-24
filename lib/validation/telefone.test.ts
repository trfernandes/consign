import { describe, expect, it } from "vitest";
import { validarTelefone } from "./telefone";

describe("validarTelefone", () => {
  it("aceita celular com DDD e 9 dígitos formatado", () => {
    expect(validarTelefone("(11) 98765-4321")).toBe(true);
  });

  it("aceita celular com DDD e 9 dígitos sem formatação", () => {
    expect(validarTelefone("11987654321")).toBe(true);
  });

  it("aceita fixo com DDD e 8 dígitos", () => {
    expect(validarTelefone("1132654321")).toBe(true);
  });

  it("rejeita DDD inválido (00)", () => {
    expect(validarTelefone("0032654321")).toBe(false);
  });

  it("rejeita quantidade errada de dígitos", () => {
    expect(validarTelefone("119876543")).toBe(false);
  });

  it("rejeita string vazia", () => {
    expect(validarTelefone("")).toBe(false);
  });
});
