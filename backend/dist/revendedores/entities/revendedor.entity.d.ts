import { Endereco } from './endereco';
import { Fiador } from './fiador';
export declare class Revendedor {
    id: number;
    nome: string;
    datanascimento: Date;
    cpf: string;
    celular1: string;
    celular2: string;
    telefoneresidencial: string;
    email: string;
    endereco: Endereco;
    casaalugada: boolean;
    dataaluguel: Date;
    fiador: Fiador;
    observacoes: string;
}
