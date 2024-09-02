import { Revendedor } from 'src/revendedores/entities/revendedor.entity';
export declare abstract class RevendedorInterfaceRepository {
    findAll(): Promise<Revendedor[]>;
    findOne(id: number): Promise<Revendedor>;
    create(revendedor: Revendedor): Promise<Revendedor>;
    update(id: number, revendedor: Partial<Revendedor>): Promise<Revendedor>;
    delete(id: number): Promise<void>;
}
