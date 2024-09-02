import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RevendedorInterfaceRepository } from './contracts/revendedor.interface.repository.';
import { Revendedor } from '../../entity/revendedores/revendedor.entity';

@Injectable()
export class RevendedorRepositoryTypeOrm
  implements RevendedorInterfaceRepository
{
  constructor(
    @InjectRepository(Revendedor)
    private revendedorRepository: Repository<Revendedor>,
  ) {}

  async findAll(): Promise<Revendedor[]> {
    return await this.revendedorRepository.find();
  }

  async findOne(id: number): Promise<Revendedor> {
    return await this.revendedorRepository.findOne({ where: { id } });
  }

  async create(revendedor: Revendedor): Promise<Revendedor> {
    const newuser = await this.revendedorRepository.create(revendedor);
    return this.revendedorRepository.save(newuser);
  }

  async update(
    id: number,
    revendedor: Partial<Revendedor>,
  ): Promise<Revendedor> {
    const existingRevendedor = await this.findOne(id);
    const newRevendedor = this.revendedorRepository.merge(
      existingRevendedor,
      revendedor,
    );
    return await this.revendedorRepository.save(newRevendedor);
  }

  async delete(id: number): Promise<void> {
    await this.revendedorRepository.delete(id);
  }
}
