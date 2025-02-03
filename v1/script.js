

const gameBox = document.getElementById("gamebox");
const PATH_IMAGE = "./img/";
const elRandomNumber = document.getElementById("randomNumber");
const currentHexa = document.getElementById("currentHexa");
const elScore0 = document.getElementById("score0");
const elScore1 = document.getElementById("score1");
const splashcreen = document.getElementById("splashcreen");
const container = document.getElementById("container");



const competePlayerBox = document.getElementById('competeTo');
const inputBot = document.getElementById("bot");

const inputSinglePlayer = document.getElementById("single_player");

const inputPlayer1 = document.getElementById("player1");
const inputPlayer2 = document.getElementById("player2");
const multiPlayerForm = document.getElementById("multi_player_form");
const singlePlayerForm = document.getElementById("single_player_form");
const competeBtn = document.getElementById("competeBtn");


start();

function start() {
  setTimeout(() => {
    splashcreen.classList.toggle("hidden");
  }, 10);

  competeBtn.addEventListener("click", (e) => {
    const competeInput = document.querySelector("input[name=enemy]:checked").value;
    console.log(competeInput);
    namePlayer(competeInput);
  });
}



function handlePlayer(el){
  competeBtn.removeAttribute("disabled")
}

function handleLevel(){
  document.getElementById("levelBtn").removeAttribute("disabled")
}

function namePlayer(player) {
  if (player == "bot") {
    singlePlayerForm.classList.toggle("hidden");
    competePlayerBox.classList.toggle('hidden');

  } else if (player == "player") {
    multiPlayerForm.classList.toggle("hidden")
    competePlayerBox.classList.toggle("hidden")
  }

  return
}



const game1 = new Game(
  gameBox,
  5,
  5,
  elRandomNumber,
  currentHexa,
  elScore0,
  elScore1,
  1
);

game1.draw();
