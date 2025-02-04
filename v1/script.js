

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




function storeCurrent(){

  // const current_object = {
  //   player, player1, player2
  // }

  // localStorage.setItem('current', JSON.stringify(current_object))
}


function startGame(el){

  const level = document.querySelector("input[name=level]:checked").value
  console.log(level);
  
  container.classList.toggle("hidden")
  container.classList.toggle("flex")
  document.getElementById("level_box").classList.toggle("hidden")
  let disabledHexa = 0
  
  
  

  switch(level){
    case 'easy':
      disabledHexa = 4
    case 'medium':
      disabledHexa = 6
    case 'hard':
      disabledHexa = 8
  }


  const game = new Game(
    gameBox,
    5,
    5,
    elRandomNumber,
    currentHexa,
    elScore0,
    elScore1,
    disabledHexa,
    player1Name, player2Name
  )

  game.draw()

}




start()

function start() {
  setTimeout(() => {
    splashcreen.classList.toggle("hidden");
    document.getElementById("competeTo").classList.toggle("hidden")
    document.getElementById("competeTo").classList.toggle("flex")
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

  window.level = document.querySelector("input[name=level]:active")

}


function chooseLevel(el, player){

  window.player1Name = document.querySelector("input[name=player1]").value
  window.player2Name = document.querySelector("input[name=player2]").value

  document.querySelector(".player_name").classList.toggle("hidden");
  document.querySelector("#level_box").classList.toggle("hidden");
  document.querySelector("#level_box").classList.toggle("flex");

}

// function startGame(el){
  
  
//   container.classList.toggle("hidden");

  
//   // const game1 = new Game(
//   //   gameBox,
//   //   5,
//   //   5,
//   //   elRandomNumber,
//   //   currentHexa,
//   //   elScore0,
//   //   elScore1,
//   //   1
//   // );
// }


function namePlayer(player) {

  window.player = player;


  if (player == "bot") {
    singlePlayerForm.classList.toggle("hidden");
    competePlayerBox.classList.toggle('hidden');

  } else if (player == "player") {
    multiPlayerForm.classList.toggle("hidden")
    competePlayerBox.classList.toggle("hidden")
  }
  return
}



function test(){
  console.log(player1Name, player2Name);
  
}

// game1.draw();
