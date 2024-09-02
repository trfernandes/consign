import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Revendedor } from '../entity/entities/revendedor.entity';
import { RevendedoresService } from './revendedores.service';
import { CreateRevendedorDto } from './dto/create-revendedor.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateRevendedorDto } from './dto/update-revendedor.dto';

@Controller('revendedores')
export class RevendedoresController {
  constructor(
    @Inject(RevendedoresService)
    private readonly revendedoresService: RevendedoresService,
  ) {}

  @Get()
  async findAll(): Promise<Revendedor[]> {
    try {
      return await this.revendedoresService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar revendedores',
        error.message,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Revendedor> {
    try {
      const data = await this.revendedoresService.findOne(id);
      if (!data) {
        throw new NotFoundException(`O Revendedor '${id}' não existe`);
      } else {
        return data;
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar revendedor',
        error.message,
      );
    }
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() body: CreateRevendedorDto): Promise<Revendedor> {
    try {
      const data = plainToInstance(Revendedor, body, {});
      return this.revendedoresService.create(data);
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao inserir revendedor',
        error.message,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateRevendedorDto,
  ): Promise<any> {
    try {
      const data = await this.revendedoresService.update(id, body);
      return { message: 'Revendedor atualizado com sucesso', data: data };
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar revendedor',
        error.message,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    try {
      const data = await this.revendedoresService.findOne(id);
      if (!data) {
        throw new NotFoundException('O Revendedor não existe');
      }
      await this.revendedoresService.delete(id);
      return { message: 'Revendedor removido com sucesso' };
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar revendedor',
        error.message,
      );
    }
  }
}
