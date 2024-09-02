import { EnderecoDto } from './endereco.dto';
import { FiadorDto } from './fiador.dto';
export declare class CreateRevendedorDto {
    nome: string;
    cpf: string;
    datanascimento: Date;
    email: string;
    celular1: string;
    celular2: string;
    telefoneresidencial: string;
    endereco: EnderecoDto;
    casaaluguel: boolean;
    dataaluguel: Date;
    fiador: FiadorDto;
    observacoes: string;
}
