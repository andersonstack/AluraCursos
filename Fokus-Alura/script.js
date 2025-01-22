const html = document.querySelector('html');
const btnFoco = document.querySelector('.app__card-button--foco');
const btnCurto = document.querySelector('.app__card-button--curto');
const btnLongo = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const startPauseBt = document.querySelector('#start-pause');
const startPauseImg = document.querySelector('#start-pause img');
const tempoNaTela = document.querySelector('#timer');

const iniciarOuPausarBt = document.querySelector('#start-pause span');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;

const play = new Audio('sons/play.wav');
const pause = new Audio('sons/pause.mp3');
const final = new Audio ('sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

function mudarTema(tema) {
    mostrarTempo();
    html.setAttribute('data-contexto', tema);
    banner.setAttribute('src', `/imagens/${tema}.png`);
    switch (tema) {
        case "foco":
            titulo.innerHTML  = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfíce<br>
                <strong class="app__title-strong">Faça uma pausa longa!</strong>`
            break;
        default:
            break;
    }
    botoes.forEach(botao => {
        botao.classList.remove('active');
    })
}

btnFoco.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    mudarTema('foco', 'foco');
    btnFoco.classList.add('active');
})

btnCurto.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    mudarTema('descanso-curto', 'descanso-curto');
    btnCurto.classList.add('active');
})

btnLongo.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    mudarTema('descanso-longo', 'descanso-longo');
    btnLongo.classList.add('active');
})

const contagemRregessiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        final.play();
        clearInterval(intervaloId);
        intervaloId = null;
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if(intervaloId) {
        iniciarOuPausarBt.textContent = 'Começar';
        startPauseImg.setAttribute('src', '/imagens/play_arrow.png');
        pause.play();
        clearInterval(intervaloId);
        intervaloId = null;
        return;
    }
    play.play();
    intervaloId = setInterval(contagemRregessiva, 1000);
    iniciarOuPausarBt.textContent = 'Pausar';
    startPauseImg.setAttribute('src', '/imagens/pause.png');
}

function mostrarTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {
        minute: '2-digit',
        second: '2-digit'
    });
    tempoNaTela.innerHTML = `
        ${tempoFormatado}
    `;
}

mostrarTempo();