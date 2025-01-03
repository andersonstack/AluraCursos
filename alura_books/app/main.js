import { exibirOsLivrosNaTela } from "./metodoForEach.js";
import { aplicarDesconto } from "./metodoMap.js";
import { filtrarLivros } from "./metodoFilter.js";
import { ordenarLivrosPorPreco } from "./metodoSort.js";


let livros = [];
const endpointDaAPI = 'https://guilhermeonrails.github.io/casadocodigo/livros.json';

getBuscarLivrosDaAPI();

async function getBuscarLivrosDaAPI(params) {
    const res = await fetch(endpointDaAPI);
    livros = await res.json();
    let livrosComDesconto = aplicarDesconto(livros);
    exibirOsLivrosNaTela(livrosComDesconto);
    
    const botoes = document.querySelectorAll(".btn");
    botoes.forEach(btn => {
        btn.addEventListener("click", () => filtrarLivros(livros, btn.value));
    })

    botoes.forEach(btn => {
        btn.addEventListener("click", () => ordenarLivrosPorPreco(livros));
    })

    const disponivel = document.querySelector("#btnLivrosDisponiveis");
    disponivel.addEventListener("click", () => {
        let livrosDisponiveis = livros.filter(livro => livro.quantidade > 0);
        console.table(livrosDisponiveis);
        const valorTotal = livrosDisponiveis.reduce((acc, livro) => acc + livro.preco, 0).toFixed(2);
        console.log(valorTotal);
        exibirOsLivrosNaTela(livrosDisponiveis, valorTotal);
    })


}
