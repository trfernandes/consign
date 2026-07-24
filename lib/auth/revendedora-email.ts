export function emailRevendedora(cpf: string): string {
  return `${cpf.replace(/\D/g, "")}@revendedora.consign.local`;
}
