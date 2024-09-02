import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Endereco } from './endereco';
import { Fiador } from './fiador';

@Entity()
export class Revendedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80, nullable: false })
  nome: string;

  @Column({ nullable: false })
  datanascimento: Date;

  @Column({ length: 11, nullable: false })
  cpf: string;

  @Column({ length: 15, nullable: false })
  celular1: string;

  @Column({ length: 15, nullable: true })
  celular2: string;

  @Column({ length: 11, nullable: true })
  telefoneresidencial: string;

  @Column({ length: 80, nullable: true })
  email: string;

  @Column(() => Endereco, { prefix: 'endereco_' })
  endereco: Endereco;

  @Column({ nullable: true, default: false })
  casaalugada: boolean;

  @Column({ nullable: true })
  dataaluguel: Date;

  @Column(() => Fiador, { prefix: 'fiador_' })
  fiador: Fiador;

  @Column({ length: 200, nullable: true })
  observacoes: string;
}
