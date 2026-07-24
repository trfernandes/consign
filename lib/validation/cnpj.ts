function calcularDigito(digitos: string, pesos: number[]): number {
  const soma = digitos
    .split("")
    .reduce((acc, digito, index) => acc + Number(digito) * pesos[index], 0);
  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}

const PESOS_PRIMEIRO_DIGITO = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
const PESOS_SEGUNDO_DIGITO = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

export function validarCnpj(cnpj: string): boolean {
  const digitos = cnpj.replace(/\D/g, "");

  if (digitos.length !== 14) {
    return false;
  }

  if (/^(\d)\1{13}$/.test(digitos)) {
    return false;
  }

  const primeiroDigito = calcularDigito(digitos.slice(0, 12), PESOS_PRIMEIRO_DIGITO);
  const segundoDigito = calcularDigito(digitos.slice(0, 13), PESOS_SEGUNDO_DIGITO);

  return primeiroDigito === Number(digitos[12]) && segundoDigito === Number(digitos[13]);
}
