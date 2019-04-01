import { Document } from "mongoose";

export interface Imoveis extends Document {
    tipo: string;
    descricao: string;
    preco: number;
    locacao_venda: string;
    endereco: string;
    ativo: boolean;
    proprietario? : string;
}