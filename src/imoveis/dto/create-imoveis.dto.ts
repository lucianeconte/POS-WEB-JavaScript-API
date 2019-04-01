export class CreateImoveisDto {
    readonly tipo: string;
    readonly descricao: string;
    readonly preco: number;
    readonly locacao_venda: string;
    readonly endereco: string;
    readonly ativo: boolean;
    readonly proprietario? : string;
}