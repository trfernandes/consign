import { describe, expect, it } from "vitest";
import { validarCpf } from "./cpf";

describe("validarCpf", () => {
  it("aceita CPF válido com pontuação", () => {
    expect(validarCpf("529.982.247-25")).toBe(true);
  });

  it("aceita CPF válido sem pontuação", () => {
    expect(validarCpf("52998224725")).toBe(true);
  });

  it("rejeita CPF com dígito verificador errado", () => {
    expect(validarCpf("52998224726")).toBe(false);
  });

  it("rejeita CPF com todos os dígitos iguais", () => {
    expect(validarCpf("11111111111")).toBe(false);
  });

  it("rejeita CPF com quantidade errada de dígitos", () => {
    expect(validarCpf("123456789")).toBe(false);
  });

  it("rejeita string vazia", () => {
    expect(validarCpf("")).toBe(false);
  });
});
