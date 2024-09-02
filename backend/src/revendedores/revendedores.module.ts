import { Module } from '@nestjs/common';
import { RevendedoresController } from './revendedores.controller';
import { RevendedoresService } from './revendedores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Revendedor } from '../entity/entities/revendedor.entity';
import { RevendedorRepositoryTypeOrm } from './repositories/revendedor.repository.typeorm';
import { RevendedorInterfaceRepository } from './repositories/contracts/revendedor.interface.repository.';

@Module({
  imports: [TypeOrmModule.forFeature([Revendedor])],
  providers: [
    {
      provide: RevendedorInterfaceRepository,
      useClass: RevendedorRepositoryTypeOrm,
    },
    RevendedoresService,
  ],
  controllers: [RevendedoresController],
})
export class RevendedoresModule {}
