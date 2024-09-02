import { Revendedor } from './entities/revendedor.entity';
import { RevendedorInterfaceRepository } from './repositories/contracts/revendedor.interface.repository.';
export declare class RevendedoresService {
    private readonly revendedorRepository;
    constructor(revendedorRepository: RevendedorInterfaceRepository);
    findAll(): Promise<Revendedor[]>;
    findOne(id: number): Promise<Revendedor>;
    create(revendedor: Revendedor): Promise<Revendedor>;
    update(id: number, revendedor: Partial<Revendedor>): Promise<Revendedor>;
    delete(id: number): Promise<void>;
}
