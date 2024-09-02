import { PartialType } from '@nestjs/mapped-types/dist/partial-type.helper';
import { CreateRevendedorDto } from './create-revendedor.dto';

export class UpdateRevendedorDto extends PartialType(CreateRevendedorDto) {}
