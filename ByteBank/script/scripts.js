import selecionaCotacao from "./imprimeCotacao.js";

// Criação da instância do gráfico
const graficoDolar = document.getElementById("graficoDolar");

const chart = new Chart(graficoDolar, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "dolar",
        data: [],
        borderWidth: 1,
      },
    ],
  },
});

function gerarHorario() {
  let data = new Date();
  let horario =
    data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
  console.log(horario);
  return horario;
}

function adicionarDados(chart, legenda, dados) {
  // Adicionando o novo dado ao gráfico
  chart.data.labels.push(legenda);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(dados);
  });

  // Atualizando o gráfico
  chart.update();
}

let workerDolar = new Worker("./script/workers/workerDolar.js");
workerDolar.postMessage("usd");

workerDolar.addEventListener("message", (event) => {
  let tempo = gerarHorario();
  let valor = event.data.ask;
  selecionaCotacao("dolar", valor);
  adicionarDados(chart, tempo, valor);
});

const graficoIene = document.getElementById("graficoIene");
const graficoParaIene = new Chart(graficoIene, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "iene",
        data: [],
        borderWidth: 1,
      },
    ],
  },
});

let workerIene = new Worker("./script/workers/workerIene.js");
workerIene.postMessage("iene");
workerIene.addEventListener("message", (event) => {
  let tempo = gerarHorario();
  let valor = event.data.ask;
  selecionaCotacao("iene", valor);
  adicionarDados(graficoParaIene, tempo, valor);
});
