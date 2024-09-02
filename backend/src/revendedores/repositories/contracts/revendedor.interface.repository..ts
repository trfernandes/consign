/* eslint-disable @typescript-eslint/no-unused-vars */

import { Revendedor } from '../../../entity/revendedores/revendedor.entity';

export abstract class RevendedorInterfaceRepository {
  findAll(): Promise<Revendedor[]> {
    throw 'Method not implemented.';
  }

  findOne(id: number): Promise<Revendedor> {
    throw 'Method not implemented.';
  }

  create(revendedor: Revendedor): Promise<Revendedor> {
    throw 'Method not implemented.';
  }

  update(id: number, revendedor: Partial<Revendedor>): Promise<Revendedor> {
    throw 'Method not implemented.';
  }

  delete(id: number): Promise<void> {
    throw 'Method not implemented.';
  }
}
