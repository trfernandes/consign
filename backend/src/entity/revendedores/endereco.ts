import { Column } from 'typeorm';

export class Endereco {
  @Column({ length: 80, nullable: true })
  logradouro: string;

  @Column({ length: 5, nullable: true })
  numero: string;

  @Column({ length: 80, nullable: true })
  bairro: string;

  @Column({ length: 80, nullable: true })
  complemento: string;

  @Column({ length: 7, nullable: true })
  cep: string;

  @Column({ length: 2, nullable: true })
  estado: string;

  @Column({ length: 80, nullable: true })
  cidade: string;

  @Column({ length: 200, nullable: true })
  observacoes: string;
}
