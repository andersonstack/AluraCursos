import { exibirOsLivrosNaTela } from "./metodoForEach.js"

export function ordenarLivrosPorPreco(livros){
    let livrosOrdenados = livros.sort((a, b) => a.preco - b.preco);
    exibirOsLivrosNaTela(livrosOrdenados);
}