import { Revendedor } from './entities/revendedor.entity';
import { RevendedoresService } from './revendedores.service';
import { CreateRevendedorDto } from './dto/create-revendedor.dto';
import { UpdateRevendedorDto } from './dto/update-revendedor.dto';
export declare class RevendedoresController {
    private readonly revendedoresService;
    constructor(revendedoresService: RevendedoresService);
    findAll(): Promise<Revendedor[]>;
    findOne(id: number): Promise<Revendedor>;
    create(body: CreateRevendedorDto): Promise<Revendedor>;
    update(id: number, body: UpdateRevendedorDto): Promise<any>;
    delete(id: number): Promise<any>;
}
