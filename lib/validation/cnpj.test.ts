import { describe, expect, it } from "vitest";
import { validarCnpj } from "./cnpj";

describe("validarCnpj", () => {
  it("aceita CNPJ válido formatado", () => {
    expect(validarCnpj("11.222.333/0001-81")).toBe(true);
  });

  it("aceita CNPJ válido sem formatação", () => {
    expect(validarCnpj("11222333000181")).toBe(true);
  });

  it("rejeita CNPJ com dígito verificador errado", () => {
    expect(validarCnpj("11222333000180")).toBe(false);
  });

  it("rejeita CNPJ com todos os dígitos iguais", () => {
    expect(validarCnpj("11111111111111")).toBe(false);
  });

  it("rejeita quantidade errada de dígitos", () => {
    expect(validarCnpj("1122233300018")).toBe(false);
  });

  it("rejeita string vazia", () => {
    expect(validarCnpj("")).toBe(false);
  });
});
