async function listaVideos() {
    const conexao = await fetch('http://localhost:3000/videos');
    const api = await conexao.json();
    return api;
}

async function criaVideo(titulo, descricao, url, imagem){
    const conexao = await fetch("http://localhost:3000/videos", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            titulo: titulo,
            descricao: `${descricao} mil visualizações`,
            url: url,
            imagem: imagem
        })
    });

    if(!conexao.ok){
        throw new Error("Não foi possível enviar o vídeo");
    }

    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}


async function buscaVideo(busca) {
    const conexao = await fetch(`http://localhost:3000/videos?q=${busca}`);
    const api = await conexao.json();
    return api;
}

export const conectaAPi = {
    listaVideos,
    criaVideo,
    buscaVideo
}
