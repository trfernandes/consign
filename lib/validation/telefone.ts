export function validarTelefone(telefone: string): boolean {
  const digitos = telefone.replace(/\D/g, "");

  if (digitos.length !== 10 && digitos.length !== 11) {
    return false;
  }

  const ddd = Number(digitos.slice(0, 2));
  if (ddd < 11 || ddd > 99) {
    return false;
  }

  if (digitos.length === 11 && digitos[2] !== "9") {
    return false;
  }

  return true;
}
