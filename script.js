function getComputerChoice(){
  let choiceStr = "";
  choiceNum = Math.floor(Math.random() * 3) + 1;
  if (choiceNum === 1) choiceStr = "Rock"
  else if (choiceNum === 2) choiceStr = "Paper" 
  else choiceStr = "Scissors";
  return choiceStr;
}

function getPlayerSelection(){
  let playerInput = prompt("Please enter your selection:");
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

function game(){
  const roundNum = 5;
  let computerSelection = "";
  let playerSelection = "";
  let roundMessage = "";
  let playerScore = 0;
  let computerScore = 0;


  for(let i = 0; i < roundNum; i++){
    computerSelection = getComputerChoice();
    playerSelection = getPlayerSelection();
    roundMessage = playRound(playerSelection, computerSelection);  
    if(roundMessage.includes("Win")) playerScore++
    else if (roundMessage.includes("Lose")) computerScore++;
    console.log(roundMessage);
  }
  console.log("Player Score: " + playerScore);
  console.log("Computer Score: " + computerScore);
  if(playerScore>computerScore) console.log("You Win! You get to live!")
  else if (playerScore<computerScore) console.log("You Lose! Computer says you die!")
  else console.log("Tie Game! Everybody dies!");
}

game();