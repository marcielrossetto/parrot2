// Variaveis globais
let quantidadeCartas = 0;
let contador = 0;
let contar = 0;

// Array com todas as imagens
const listaImagens = [
  "bobrossparrot",
  "explodyparrot",
  "fiestaparrot",
  "metalparrot",
  "revertitparrot",
  "tripletsparrot",
  "unicornparrot",
];

let listaImagensEmbaralhada = [];
let listImagensEmbaralhadaDuplicadas = [];

// Abertura da página, conferindo se as entradas do jogador estão de acordo com o solicitado

function entradaDosNumeros() {
  listaImagensEmbaralhada = [];
  quantidadeCartas = Number(prompt("Insira um número entre 4 e 14"));
  verificarNumerosEntrada();
}

function verificarNumerosEntrada() {
  let isImpar = quantidadeCartas % 2;

  if (isImpar == 1 || quantidadeCartas < 4 || quantidadeCartas > 14) {
    alert("O número precisa ser PAR e estar entre 4 e 14");
    entradaDosNumeros();
  } else {
    criarCartas();
  }
}

function embaralharCartas() {
  listaImagens.sort(function () {
    return 0.5 - Math.random();
  });

  for (let i = 0; i < quantidadeCartas / 2; i++) {
    listaImagensEmbaralhada.push(listaImagens[i]);
  }
}

// Função para criar as cartas

function criarCartas() {
  const cartas = document.querySelector(".container");
  let contadorImagem = 0;
  cartas.innerHTML = "";

  embaralharCartas();

  listImagensEmbaralhadaDuplicadas = [
    ...listaImagensEmbaralhada,
    ...listaImagensEmbaralhada,
  ].sort(function () {
    return 0.5 - Math.random();
  });

  for (let i = 0; i < quantidadeCartas; i++) {
    contadorImagem = listImagensEmbaralhadaDuplicadas[i];
    cartas.innerHTML += `
          <div class="card" onclick="flip(this)" data-parrot="${contadorImagem}">
            <div class="face front" style="background-image: url('img/${contadorImagem}.gif')"></div>
            <div class="face back"></div>
          </div>`;
  }
}

// Funções auxiliares

let primeiraCarta = "";
let segundaCarta = "";
let primeiroPersonagem = "";
let segundoPersonagem = "";

function flip(item) {  
  if (primeiraCarta === "") {    
      primeiraCarta = item;    
      item.classList.add("flip");    
      primeiroPersonagem = item.getAttribute("data-parrot");  
  } else if (segundaCarta === "") {    
      segundaCarta = item;    
      item.classList.add("flip");    
      segundoPersonagem = item.getAttribute("data-parrot");    
      setTimeout(verificarSeSaoIguais, 1000);  
  }  
  contador++; 
  setTimeout(encerrarJogo, 500);
}

function verificarSeSaoIguais() {  
  if (primeiroPersonagem == segundoPersonagem) {    
      primeiraCarta = "";    
      segundaCarta = "";  
  } else {    
      primeiraCarta.classList.remove("flip");    
      segundaCarta.classList.remove("flip");    
      primeiraCarta = "";    
      segundaCarta = "";  
  }
}


function encerrarJogo() {
  const flipedCards = document.querySelectorAll(".flip");
  const numeroCartas = document.querySelectorAll(".card");
  if (flipedCards.length === numeroCartas.length) {
    const jogadasDivididas = contador;
    alert(
      `Você venceu o jogo em ${jogadasDivididas} tentativas e ${contar} segundos, parabéns!`
    );
    contar = 0;
  }
}

function relogioContador() {
  let segundos = document.querySelector(".relogio");
  segundos.innerHTML = `${contar++}`;
}

entradaDosNumeros();
setInterval(relogioContador, 1000);
