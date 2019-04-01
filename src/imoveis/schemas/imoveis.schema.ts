import * as mongoose from "mongoose"

export const ImoveisSchema = new mongoose.Schema({
    tipo: String,
    descricao: String,
    preco: {
        type: Number,
        default: 0
    },
    locacao_venda: String,
    endereco: String,
    ativo: {
        type: Boolean,
        default: true
    },
    proprietario : String
});