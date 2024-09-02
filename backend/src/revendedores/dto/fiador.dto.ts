import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { EnderecoDto } from './endereco.dto';
import { Type } from 'class-transformer';
import { IsCpf } from '../../constraints/cpf.validator';

export class FiadorDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MaxLength(80, { message: 'O nome deve ter no máximo 80 caracteres' })
  nome: string;

  @IsNotEmpty({ message: 'O cpf é obrigatório' })
  @MinLength(11, { message: 'A quantidade de caracteres do cpf deve ser é 11' })
  @MaxLength(11, { message: 'A quantidade de caracteres do cpf deve ser é 11' })
  @IsCpf()
  cpf: string;

  @IsNotEmpty({ message: 'O endereço é obrigatório' })
  @ValidateNested({ each: true })
  @Type(() => EnderecoDto)
  endereco: EnderecoDto;

  @IsOptional()
  @IsEmail({}, { message: 'O e-mail é inválido' })
  @MaxLength(80, { message: 'O e-mail deve ter no máximo 80 caracteres' })
  email: string;

  @IsNotEmpty({ message: 'O celular 1 é obrigatório' })
  @IsMobilePhone()
  celular: string;

  @IsOptional()
  observacoes: string;
}
