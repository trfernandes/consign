import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { EnderecoDto } from './endereco.dto';
import { Transform, Type } from 'class-transformer';
import { FiadorDto } from './fiador.dto';
import { IsCpf } from '../../constraints/cpf.validator';
import { IsBrMobilePhone } from '../../constraints/mobile-phone.validator';
import { IsPhone } from '../../constraints/phone.validator';

export class CreateRevendedorDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MaxLength(80, { message: 'O nome deve ter no máximo 80 caracteres' })
  nome: string;

  @IsNotEmpty({ message: 'O cpf é obrigatório' })
  @MinLength(11, { message: 'A quantidade de caracteres do cpf deve ser é 11' })
  @MaxLength(11, { message: 'A quantidade de caracteres do cpf deve ser é 11' })
  @IsCpf()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  cpf: string;

  @IsNotEmpty({ message: 'A data de nascimento é obrigatório' })
  datanascimento: Date;

  @IsOptional()
  @IsEmail({}, { message: 'O e-mail é inválido' })
  @MaxLength(80, { message: 'O e-mail deve ter no máximo 80 caracteres' })
  email: string;

  @IsNotEmpty({ message: 'O celular 1 é obrigatório' })
  @IsBrMobilePhone({ message: 'O celular 1 é inválido' })
  @Transform(({ value }) => value.replace(/\D/g, ''))
  celular1: string;

  @IsOptional()
  @IsBrMobilePhone({ message: 'O celular 2 é inválido' })
  celular2: string;

  @IsOptional()
  @IsPhone({ message: 'O telefone residencial é inválido' })
  telefoneresidencial: string;

  @IsNotEmpty({ message: 'O endereço é obrigatório' })
  @ValidateNested({ each: true })
  @Type(() => EnderecoDto)
  endereco: EnderecoDto;

  @IsOptional()
  @IsBoolean({ message: 'O campo deve ser um valor booleano' })
  casaaluguel: boolean;

  @IsOptional()
  @IsDate()
  dataaluguel: Date;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FiadorDto)
  fiador: FiadorDto;

  @IsOptional()
  @MaxLength(200, { message: 'A observação deve ter no máximo 200 caracteres' })
  observacoes: string;
}
