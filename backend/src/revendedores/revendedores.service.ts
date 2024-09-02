/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { Revendedor } from '../entity/entities/revendedor.entity';
import {
  // REVENDEDOR_INTERFACE,
  RevendedorInterfaceRepository,
} from './repositories/contracts/revendedor.interface.repository.';

@Injectable()
export class RevendedoresService {
  constructor(
    @Inject(RevendedorInterfaceRepository)
    private readonly revendedorRepository: RevendedorInterfaceRepository,
  ) {}

  async findAll(): Promise<Revendedor[]> {
    return await this.revendedorRepository.findAll();
  }

  async findOne(id: number): Promise<Revendedor> {
    return await this.revendedorRepository.findOne(id);
  }

  async create(revendedor: Revendedor): Promise<Revendedor> {
    return await this.revendedorRepository.create(revendedor);
  }

  async update(
    id: number,
    revendedor: Partial<Revendedor>,
  ): Promise<Revendedor> {
    return await this.revendedorRepository.update(id, revendedor);
  }

  async delete(id: number): Promise<void> {
    await this.revendedorRepository.delete(id);
  }
}
