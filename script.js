const gameMessage = document.querySelector('.game-message'); 
const roundMessage = document.querySelector('.round-message');
const playerScoreMessage = document.querySelector('.player-score-message');
const computerScoreMessage = document.querySelector('.computer-score-message');
const buttons = document.querySelectorAll('.button-container > button');
const resetButton = document.querySelector('.reset-button');
const roundNum = 5;
let playerScore = 0;
let computerScore = 0;

function getComputerChoice(){
  let choiceStr = "";
  choiceNum = Math.floor(Math.random() * 3) + 1;
  if (choiceNum === 1) choiceStr = "Rock"
  else if (choiceNum === 2) choiceStr = "Paper" 
  else choiceStr = "Scissors";
  return choiceStr;
}

function getPlayerSelection(e){
  let playerInput = e.target.id;
  playerInput = formatInput(playerInput);
  return playerInput;
}

function formatInput(input){
  let returnStr = "";
  returnStr = input.substring(0,1).toUpperCase();
  returnStr = returnStr.concat(input.substring(1).toLowerCase());
  return returnStr;
}

function playRound(playerSelection, computerSelection){
  const winMessage = "You Win! ";
  const loseMessage = "You Lose! ";
  const tieMessage = "It's a Tie! ";
  const rockWin = "Rock beats Scissors";
  const paperWin = "Paper beats Rock";
  const scissorsWin = "Scissors beats Paper";

  if(playerSelection === "Rock"){
    if(computerSelection === "Rock") 
      return tieMessage;
    else if (computerSelection === "Paper") 
      return loseMessage + paperWin;
    else if (computerSelection === "Scissors") 
      return winMessage + rockWin;
  } else if (playerSelection === "Paper"){
    if(computerSelection === "Rock") 
      return winMessage + paperWin;
    else if (computerSelection === "Paper") 
      return tieMessage;
    else if (computerSelection === "Scissors") 
      return loseMessage + scissorsWin;
  } else if (playerSelection === "Scissors"){
    if(computerSelection === "Rock") 
      return loseMessage + rockWin;
    else if (computerSelection === "Paper") 
      return winMessage + scissorsWin;
    else if (computerSelection === "Scissors") 
      return tieMessage;
  }
}

function updateGameMessage(string) { gameMessage.textContent=string };
function updateRoundMessage(string) { roundMessage.textContent=string };
function updatePlayerScoreMessage(string) { playerScoreMessage.textContent=string };
function updateComputerScoreMessage(string) { computerScoreMessage.textContent=string };

function endGame(){
  toggleButtons();
  resetUI();
  playerScore = 0;
  computerScore = 0;
}

function resetUI(){
  updateGameMessage("First player to 5 points wins!");
  updateRoundMessage("Make a selection below");
  updatePlayerScoreMessage("0");
  updateComputerScoreMessage("0");
}

function toggleButtons(){
  for(const button of buttons){
    if(button.style.display === "none")
      button.style.display = "inline-block";
      else button.style.display = "none";
  };

  if(resetButton.style.display === "none")
    resetButton.style.display = "inline-block";
    else resetButton.style.display = "none";
}


function game(e){
  let computerSelection = "";
  let playerSelection = "";
  let roundOutcome = ""; 

  // gather computer and player input
  computerSelection = getComputerChoice();
  playerSelection = getPlayerSelection(e);

  // process input and determine outcome of round
  roundOutcome = playRound(playerSelection, computerSelection);  
  if(roundOutcome.includes("Win")) playerScore++
  else if (roundOutcome.includes("Lose")) computerScore++;

  // update UI according to outcome
  updateRoundMessage(roundOutcome);
  updatePlayerScoreMessage("Player Score: " + playerScore);
  updateComputerScoreMessage("Computer Score: " + computerScore);

  if (playerScore >= roundNum || computerScore >= roundNum){
    if(playerScore>computerScore) updateGameMessage("You Win! You get to live!")
    else if (playerScore<computerScore) updateGameMessage("You Lose! Computer says you die!")
    else updateGameMessage("Tie Game! Everybody dies!");
    toggleButtons();
  }
}



// event listeners assigned to UI elements
for(const button of buttons){
    button.addEventListener('click', (e) => {
      game(e);
  });
}

resetButton.addEventListener('click', endGame);
