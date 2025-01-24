import imprimeCotacao from "./imprimeCotacao.js";

// Criação da instância do gráfico
const graficoDolar = document.getElementById("graficoDolar");

const chart = new Chart(graficoDolar, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Dólar",
        data: [],
        borderWidth: 1,
      },
    ],
  },
});

// Intervalo para chamar a função conectaAPI a cada 5 segundos
setInterval(() => conectaAPI(), 5000);

async function conectaAPI() {
  try {
    // Fazendo a requisição para a API
    const conecta = await fetch(
      "https://economia.awesomeapi.com.br/json/last/USD-BRL"
    );
    const conectaTraduzido = await conecta.json();

    // Gerando o horário
    let tempo = gerarHorario();

    // Obtendo o valor da cotação do dólar
    let valor = conectaTraduzido.USDBRL.ask;

    // Atualizando o gráfico com os novos dados
    adicionarDados(chart, tempo, valor); // Passando a instância do gráfico
    imprimeCotacao("dolar", valor);
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
  }
}

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
