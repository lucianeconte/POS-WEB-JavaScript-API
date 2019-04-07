import { Document } from "mongoose";

export interface Imovel extends Document {
    tipo: string;
    descricao: string;
    preco: number;
    locacao_venda: string;
    endereco: string;
    ativo: boolean;
    proprietario? : string;
}