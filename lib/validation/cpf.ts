function calcularDigito(digitos: string, pesoInicial: number): number {
  const soma = digitos
    .split("")
    .reduce((acc, digito, index) => acc + Number(digito) * (pesoInicial - index), 0);
  const resto = (soma * 10) % 11;
  return resto === 10 ? 0 : resto;
}

export function validarCpf(cpf: string): boolean {
  const digitos = cpf.replace(/\D/g, "");

  if (digitos.length !== 11) {
    return false;
  }

  if (/^(\d)\1{10}$/.test(digitos)) {
    return false;
  }

  const primeiroDigito = calcularDigito(digitos.slice(0, 9), 10);
  const segundoDigito = calcularDigito(digitos.slice(0, 10), 11);

  return primeiroDigito === Number(digitos[9]) && segundoDigito === Number(digitos[10]);
}
