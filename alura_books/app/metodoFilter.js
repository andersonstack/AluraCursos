import { exibirOsLivrosNaTela } from "./metodoForEach.js";

export function filtrarLivros(livros, categoria) {
    if (Array.isArray(livros)) {
        let livrosFiltrados = livros.filter(livro => livro.categoria == categoria);
        if (categoria == 'disponivel') {
            livros = livros.filter(livro => livro.quantidade > 0);
            exibirOsLivrosNaTela(livros);
        }
        exibirOsLivrosNaTela(livrosFiltrados);
    } else {
        console.error("A variável 'livros' não é um array.");
    }
}
