import { Repository } from 'typeorm';
import { Revendedor } from '../entities/revendedor.entity';
import { RevendedorInterfaceRepository } from './contracts/revendedor.interface.repository.';
export declare class RevendedorRepositoryTypeOrm implements RevendedorInterfaceRepository {
    private revendedorRepository;
    constructor(revendedorRepository: Repository<Revendedor>);
    findAll(): Promise<Revendedor[]>;
    findOne(id: number): Promise<Revendedor>;
    create(revendedor: Revendedor): Promise<Revendedor>;
    update(id: number, revendedor: Partial<Revendedor>): Promise<Revendedor>;
    delete(id: number): Promise<void>;
}
