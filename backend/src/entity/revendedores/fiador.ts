import { Column } from 'typeorm';
import { Endereco } from './endereco';

export class Fiador {
  @Column({ length: 80, nullable: true })
  nome: string;

  @Column({ length: 11, nullable: true })
  cpf: string;

  @Column(() => Endereco, { prefix: 'endereco_' })
  endereco: Endereco;

  @Column({ length: 12, nullable: true })
  celular: string;

  @Column({ length: 200, nullable: true })
  observacoes: string;
}
