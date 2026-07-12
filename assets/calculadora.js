// Constantes de conversão (aproximação: ano de 365 dias sem bissexto, mês de 30 dias)
const DIAS_POR_ANO = 365;
const DIAS_POR_MES = 30;

// Formata números no padrão brasileiro (1.825 e 912,5), com casas decimais opcionais
function formatarNumero(valor, casasDecimais = 0) {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: casasDecimais,
    maximumFractionDigits: casasDecimais,
  });
}

// Lê um campo inteiro: vazio vira 0; texto inválido ou negativo retorna null (inválido)
function lerCampoInteiro(id) {
  const valor = document.getElementById(id).value.trim();
  if (valor === "") return 0;

  const numero = parseInt(valor, 10);
  if (isNaN(numero) || numero < 0) return null;

  return numero;
}

// Escreve um resultado no elemento: "sucesso" destaca em negrito, "erro" em vermelho.
// Também remove o estilo de dica do estado inicial.
function definirResultado(id, texto, tipo = "sucesso") {
  const el = document.getElementById(id);
  el.textContent = texto;
  el.classList.remove("text-muted", "fst-italic", "text-danger", "fw-bold");
  el.classList.add(tipo === "erro" ? "text-danger" : "fw-bold");
}

// Função que calcula a conversão para dias
document.getElementById("calcularBtn").addEventListener("click", function() {
  // Obter valores dos campos (vazio = 0; texto inválido/negativo = null)
  const anos = lerCampoInteiro("anos");
  const meses = lerCampoInteiro("meses");
  const dias = lerCampoInteiro("dias");

  if (anos === null || meses === null || dias === null) {
    // Exibir mensagem de erro
    definirResultado("resultado", "Informe apenas números inteiros, sem sinal.", "erro");
    return;
  }

  // Calcular total de dias
  const totalDias = (anos * DIAS_POR_ANO) + (meses * DIAS_POR_MES) + dias;

  // Exibir o resultado
  definirResultado("resultado", `Isto equivale a ${formatarNumero(totalDias)} dias.`);
});


// Função para calcular a conversão para anos, meses e dias por extenso
document.getElementById('calcularAnoBtn').addEventListener('click', function() {
  const diasEntrada = lerCampoInteiro('diasParaAno');

  if (diasEntrada === null) {
    // Exibir mensagem de erro
    definirResultado('resultadoAno', 'Informe apenas números inteiros, sem sinal.', 'erro');
    return;
  }

  // Calcular anos, meses e dias
  const anos = Math.floor(diasEntrada / DIAS_POR_ANO); // Quantos anos completos
  const diasRestantes = diasEntrada % DIAS_POR_ANO; // Resto de dias após remover os anos completos
  const meses = Math.floor(diasRestantes / DIAS_POR_MES); // Quantos meses completos
  const dias = diasRestantes % DIAS_POR_MES; // Restante de dias após remover os meses completos

  // Montar a string de resultado por extenso
  let resultadoTexto = "";

  if (anos > 0) {
    resultadoTexto += `${anos} ano${anos > 1 ? 's' : ''}`;
  }

  if (meses > 0) {
    if (resultadoTexto) resultadoTexto += ", ";
    resultadoTexto += `${meses} ${meses > 1 ? 'meses' : 'mês'}`;
  }

  if (dias > 0) {
    if (resultadoTexto) resultadoTexto += " e ";
    resultadoTexto += `${dias} dia${dias > 1 ? 's' : ''}`;
  }

  // Caso não haja anos, meses ou dias
  if (resultadoTexto === "") {
    resultadoTexto = "0 dias";
  }

  // Exibir o resultado por extenso
  definirResultado('resultadoAno', `Isto equivale a ${resultadoTexto}.`);
});



document.getElementById("calcularFPBtn").addEventListener("click", function () {
  // Obter o valor do input
  const dias = parseFloat(document.getElementById("diasFP").value);

  // Se o valor for negativo ou não for número válido, não faz nada
  if (isNaN(dias) || dias < 0) {
    return;
  }

  // Tabela de frações e seus denominadores
  const fracoes = [
    { fracao: "1/6", valor: 1 / 6 },
    { fracao: "1/5", valor: 1 / 5 },
    { fracao: "1/4", valor: 1 / 4 },
    { fracao: "1/3", valor: 1 / 3 },
    { fracao: "3/8", valor: 3 / 8 },
    { fracao: "2/5", valor: 2 / 5 },
    { fracao: "5/12", valor: 5 / 12 },
    { fracao: "11/24", valor: 11 / 24 },
    { fracao: "1/2", valor: 1 / 2 },
    { fracao: "3/5", valor: 3 / 5 },
    { fracao: "2/3", valor: 2 / 3 },
  ];

  // Tabela de porcentagens
  const porcentagens = [
    16, 20, 25, 30, 40, 50, 60, 70,
  ];

  // Preenche uma célula de resultado, tirando o estilo de estado vazio (travessão)
  function preencherCelula(celula, valor) {
    celula.innerText = formatarNumero(valor, 1);
    celula.classList.remove("sem-valor");
  }

  // Atualizar tabela de frações
  const tabelaFracoes = document.querySelectorAll("#tfr tbody tr");
  fracoes.forEach((item, index) => {
    preencherCelula(tabelaFracoes[index].children[1], dias * item.valor);
  });

  // Atualizar tabela de porcentagens
  const tabelaPorcentagens = document.querySelectorAll("#tpc tbody tr");
  porcentagens.forEach((percentual, index) => {
    preencherCelula(tabelaPorcentagens[index].children[1], dias * (percentual / 100));
  });
});

// Espelha o radio selecionado na classe .active do label (destaque visual do alternador)
const radiosOperacao = document.querySelectorAll('input[name="operacao"]');
function sincronizarOperacao() {
  radiosOperacao.forEach(radio => {
    document.querySelector(`label[for="${radio.id}"]`).classList.toggle("active", radio.checked);
  });
}
radiosOperacao.forEach(radio => radio.addEventListener("change", sincronizarOperacao));
sincronizarOperacao();

// Função para calcular e exibir o resultado
document.getElementById("calcularOPBtn").addEventListener("click", function() {
  const dataInput = document.getElementById("dataOP");
  const diasInput = document.getElementById("diasOP");

  // Obter a data do campo dataOP dividida em dia, mês e ano
  const [anoOP, mesOP, diaOP] = dataInput.value.split("-");

  const data = new Date(anoOP, mesOP - 1, diaOP); // Mês é base 0, por isso subtrai 1

  // Obter o número de dias do campo diasOP
  const dias = parseInt(diasInput.value, 10);

  if (isNaN(dias) || dias <= 0 || isNaN(data)) {
    definirResultado("resultadoOP", "Informe uma data e um número de dias maior que zero.", "erro");
    return;
  }

  // Obter a operação selecionada no alternador (+ ou -)
  const operacao = document.querySelector('input[name="operacao"]:checked').value;

  // Realizar a operação de adição ou subtração
  if (operacao === "+") {
    data.setDate(data.getDate() + dias); // Adiciona dias
  } else if (operacao === "-") {
    data.setDate(data.getDate() - dias); // Subtrai dias
  }

  // Formatar a data para dd/mm/yyyy
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const dataFormatada = `${dia}/${mes}/${ano}`;

  // Exibir o resultado
  definirResultado("resultadoOP", `O resultado é ${dataFormatada}.`);
});

// Função para calcular a diferença entre duas datas
document.getElementById("calcularDifBtn").addEventListener("click", function() {
  // Obter os valores das datas
  const data1 = document.getElementById("data1").value;
  const data2 = document.getElementById("data2").value;

  // Verificar se as duas datas foram preenchidas
  if (data1 && data2) {
    // Converter para objetos Date usando horário local (evita deslocamento de fuso do ISO)
    const [a1, m1, d1] = data1.split("-").map(Number);
    const [a2, m2, d2] = data2.split("-").map(Number);
    const date1 = new Date(a1, m1 - 1, d1);
    const date2 = new Date(a2, m2 - 1, d2);

    // Calcular a diferença em milissegundos
    const diffTime = Math.abs(date2 - date1);

    // Converter para dias
    const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));

    // Exibir o resultado
    definirResultado("resultadoDif", `A diferença é de ${formatarNumero(diffDays)} dias.`);
  } else {
    // Caso as datas não estejam preenchidas
    definirResultado("resultadoDif", "Informe as duas datas.", "erro");
  }
});


// Copia o texto e exibe "Copiado!" no botão por 1,5s, restaurando o conteúdo original
function mostrarCopiado(botao, texto) {
  navigator.clipboard.writeText(texto);

  if (botao.dataset.copiando) return; // evita capturar "Copiado!" em cliques repetidos
  botao.dataset.copiando = "true";

  const conteudoOriginal = botao.innerHTML;
  botao.innerHTML = "Copiado!";

  setTimeout(() => {
    botao.innerHTML = conteudoOriginal;
    delete botao.dataset.copiando;
  }, 1500);
}

// Registra um botão que copia o texto de um resultado, removendo o prefixo e o ponto final
function configurarCopia(botaoId, resultadoId, prefixo) {
  document.getElementById(botaoId).addEventListener("click", function() {
    let texto = document.getElementById(resultadoId).innerText.replace(prefixo, "");

    // Remove o ponto final, se presente
    if (texto.endsWith(".")) {
      texto = texto.slice(0, -1);
    }

    mostrarCopiado(this, texto);
  });
}

configurarCopia("copiarCvDiasBtn", "resultado", "Isto equivale a ");
configurarCopia("copiarCvAnoBtn", "resultadoAno", "Isto equivale a ");
configurarCopia("copiarOPBtn", "resultadoOP", "O resultado é ");
configurarCopia("copiarDifBtn", "resultadoDif", "A diferença é de ");


