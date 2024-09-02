import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
import { IsEstado } from '../../constraints/estado.validator';

export class EnderecoDto {
  @IsNotEmpty({ message: 'O logradouro é obrigatório' })
  @MaxLength(80, { message: 'O logradouro deve ter no máximo 80 caracteres' })
  logradouro: string;

  @IsNotEmpty({ message: 'O número é obrigatório' })
  @MaxLength(5, { message: 'O número deve ter no máximo 5 caracteres' })
  numero: string;

  @IsNotEmpty({ message: 'O bairro é obrigatório' })
  @MaxLength(80, { message: 'O bairro deve ter no máximo 80 caracteres' })
  bairro: string;

  @IsOptional()
  @MaxLength(80, { message: 'O complemento deve ter no máximo 80 caracteres' })
  complemento: string;

  @IsOptional()
  @MaxLength(7, { message: 'O CEP deve ter no máximo 7 caracteres' })
  cep: string;

  @IsNotEmpty({ message: 'O estado é obrigatório' })
  @MinLength(2, { message: 'O estado deve ter no mínimo 2 caracteres' })
  @MaxLength(2, { message: 'O estado deve ter no máximo 2 caracteres' })
  @IsEstado()
  @Transform(({ value }) => value.toUpperCase())
  estado: string;

  @IsNotEmpty({ message: 'A cidade é obrigatória' })
  @MaxLength(80, { message: 'A cidade deve ter no máximo 80 caracteres' })
  cidade: string;

  @IsOptional()
  @MaxLength(200, {
    message: 'As observações devem ter no máximo 200 caracteres',
  })
  observacoes: string;
}
