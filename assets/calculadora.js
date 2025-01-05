// Função que calcula a conversão para dias
document.getElementById("calcularBtn").addEventListener("click", function() {
  // Obter valores dos campos
  const anos = parseInt(document.getElementById("anos").value) || 0;  // Se vazio, considera como 0
  const meses = parseInt(document.getElementById("meses").value) || 0;  // Se vazio, considera como 0
  const dias = parseInt(document.getElementById("dias").value) || 0;  // Se vazio, considera como 0

  if (anos < 0 || meses < 0 || dias < 0) {
    // Exibir mensagem de erro
    document.getElementById("resultado").innerText = "Por favor, informe um valor válido.";
    return;
  }

  // Calcular total de dias
  const diasPorAno = 365; // Assumindo 365 dias por ano (não considerando anos bissextos)
  const diasPorMes = 30;  // Assumindo uma média de 30 dias por mês

  const totalDias = (anos * diasPorAno) + (meses * diasPorMes) + dias;

  // Exibir o resultado
  document.getElementById("resultado").innerText = `Isto equivale a ${totalDias} dias.`;
});


// Função para calcular a conversão para anos, meses e dias por extenso
document.getElementById('calcularAnoBtn').addEventListener('click', function() {
  const diasEntrada = parseInt(document.getElementById('diasParaAno').value) || 0;

  if (diasEntrada < 0) {
    // Exibir mensagem de erro
    document.getElementById('resultadoAno').innerText = 'Por favor, informe um valor válido.';
    return;
  }

  // Calcular anos, meses e dias
  const anos = Math.floor(diasEntrada / 365); // Quantos anos completos
  const diasRestantes = diasEntrada % 365; // Resto de dias após remover os anos completos
  const meses = Math.floor(diasRestantes / 30); // Quantos meses completos
  const dias = diasRestantes % 30; // Restante de dias após remover os meses completos

  // Montar a string de resultado por extenso
  let resultadoTexto = "";

  if (anos > 0) {
    resultadoTexto += `${anos} ano${anos > 1 ? 's' : ''}`;
  }

  if (meses > 0) {
    if (resultadoTexto) resultadoTexto += ", ";
    resultadoTexto += `${meses} mes${meses > 1 ? 'es' : ''}`;
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
  document.getElementById('resultadoAno').innerText = `Isto equivale a ${resultadoTexto}.`;
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

  // Atualizar tabela de frações
  const tabelaFracoes = document.querySelectorAll("#tfr tbody tr");
  fracoes.forEach((item, index) => {
    const diasCalculados = (dias * item.valor).toFixed(1);
    tabelaFracoes[index].children[1].innerText = diasCalculados;
  });

  // Atualizar tabela de porcentagens
  const tabelaPorcentagens = document.querySelectorAll("#tpc tbody tr");
  console.log(tabelaPorcentagens);
  porcentagens.forEach((percentual, index) => {
    const diasCalculados = (dias * (percentual / 100)).toFixed(1);
    tabelaPorcentagens[index].children[1].innerText = diasCalculados;
  });
});
document.querySelectorAll("table tbody tr").forEach(row => {
  // Quando o mouse passar por cima da linha
  row.addEventListener("mouseover", () => {
    row.classList.add("table-active"); // Classe Bootstrap para destacar a linha
  });

  // Quando o mouse sair da linha
  row.addEventListener("mouseout", () => {
    row.classList.remove("table-active");
  });
});

// JavaScript para alterar o valor exibido no botão do dropdown
document.querySelectorAll('.dropdown-item').forEach(item => {
  item.addEventListener('click', function (event) {
    event.preventDefault(); // Evita navegação no clique
    const selectedValue = this.getAttribute('data-value'); // Obtém o valor selecionado (+ ou -)
    const dropdownButton = document.getElementById('operacaoDropdown'); // Botão do dropdown
    dropdownButton.textContent = selectedValue; // Altera o texto do botão
  });
});

// Função para calcular e exibir o resultado
document.getElementById("calcularOPBtn").addEventListener("click", function() {
  const dataInput = document.getElementById("dataOP");
  const diasInput = document.getElementById("diasOP");
  const operacaoDropdown = document.getElementById("operacaoDropdown");
  const resultadoSpan = document.getElementById("resultadoOP");

  // Obter a data do campo dataOP dividida em dia, mês e ano
  const [anoOP, mesOP, diaOP] = dataInput.value.split("-");

  const data = new Date(anoOP, mesOP - 1, diaOP); // Mês é base 0, por isso subtrai 1

  // Obter o número de dias do campo diasOP
  const dias = parseInt(diasInput.value);

  if (isNaN(dias) || dias <= 0 || isNaN(data)) {
    resultadoSpan.innerText = `Por favor, insira uma data válida e dias maiores que 0.`;
    return;
  }

  // Obter a operação selecionada (+ ou -)
  const operacao = operacaoDropdown.innerText.trim();

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
  resultadoSpan.innerText = `O resultado é ${dataFormatada}.`;
});

// Função para calcular a diferença entre duas datas
document.getElementById("calcularDifBtn").addEventListener("click", function() {
  // Obter os valores das datas
  const data1 = document.getElementById("data1").value;
  const data2 = document.getElementById("data2").value;

  // Verificar se as duas datas foram preenchidas
  if (data1 && data2) {
    // Converter para objetos Date
    const date1 = new Date(data1);
    const date2 = new Date(data2);

    // Calcular a diferença em milissegundos
    const diffTime = Math.abs(date2 - date1);

    // Converter para dias
    const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));

    // Exibir o resultado
    document.getElementById("resultadoDif").textContent = `A diferença é de ${diffDays} dias.`;
  } else {
    // Caso as datas não estejam preenchidas
    document.getElementById("resultadoDif").textContent = "Por favor, insira ambas as datas.";
  }
});


// copiarCvDiasBtn
document.getElementById("copiarCvDiasBtn").addEventListener("click", function() {
  const resultado = document.getElementById("resultado");

  var texto = resultado.innerText.replace('Isto equivale a ', '');

  // Remove o ponto final, se presente
  if (texto.endsWith('.')) {
    texto = texto.slice(0, -1);
  }

  const tempInput = document.createElement('input');
  document.body.appendChild(tempInput);
  tempInput.value = texto;
  tempInput.select();
  document.execCommand('copy');

  document.body.removeChild(tempInput);
});

// copiarCvAnoBtn
document.getElementById("copiarCvAnoBtn").addEventListener("click", function() {
  const resultado = document.getElementById("resultadoAno");

  var texto = resultado.innerText.replace('Isto equivale a ', '');

  // Remove o ponto final, se presente
  if (texto.endsWith('.')) {
    texto = texto.slice(0, -1);
  }

  const tempInput = document.createElement('input');
  document.body.appendChild(tempInput);
  tempInput.value = texto;
  tempInput.select();
  document.execCommand('copy');

  document.body.removeChild(tempInput);
});

// copiarOPBtn
document.getElementById("copiarOPBtn").addEventListener("click", function() {
  const resultado = document.getElementById("resultadoOP");

  var texto = resultado.innerText.replace('O resultado é ', '');

  // Remove o ponto final, se presente
  if (texto.endsWith('.')) {
    texto = texto.slice(0, -1);
  }

  const tempInput = document.createElement('input');
  document.body.appendChild(tempInput);
  tempInput.value = texto;
  tempInput.select();
  document.execCommand('copy');

  document.body.removeChild(tempInput);
});



// copiarDifBtn
document.getElementById("copiarDifBtn").addEventListener("click", function() {
  const resultado = document.getElementById("resultadoDif");

  var texto = resultado.innerText.replace('A diferença é de ', '');

  // Remove o ponto final, se presente
  if (texto.endsWith('.')) {
    texto = texto.slice(0, -1);
  }

  const tempInput = document.createElement('input');
  document.body.appendChild(tempInput);
  tempInput.value = texto;
  tempInput.select();
  document.execCommand('copy');

  document.body.removeChild(tempInput);
});


