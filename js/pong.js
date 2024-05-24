const table = document.querySelector('.game-container');
const ball = document.querySelector('.ball');
const ballWidth = ball.getBoundingClientRect().width;
const tableHeight = table.getBoundingClientRect().height;
const tableWidth = table.getBoundingClientRect().width;
const playerViewPoint = document.querySelector('#point-left');
const autoViewPoint = document.querySelector('#point-right');
const player = document.querySelector('#player-left');
const autoplayer = document.querySelector('#player-right');
const playerHeight = player.getBoundingClientRect().height;
const playerWidth = player.getBoundingClientRect().width;
const autoplayerHeight = autoplayer.getBoundingClientRect().height;
const autoplayerWidth = autoplayer.getBoundingClientRect().width;
const levelView = document.querySelector('#level');
const startPauseButton = document.getElementById('start-pause-button');

let gameRunning = false;
let lastMouseY = 0;
let mouseSpeed = 0;
let player_points = 0;
let auto_points = 0;
let level = 1;
let justScored = false;
let ballX = tableWidth / 2 - 10;
let ballY = Math.floor(Math.random() * (tableHeight - 40)) + 20;

let ballSpeedX = getRandomSpeed(4);//initial speed
let ballSpeedY = getRandomSpeed(5);//initial speed
let probability = 0.70 //initial probability 
let autoplayerSpeed = 3; //initial autoplayer speed
let tmpSpeed = {autospeed: autoplayerSpeed}
let animationFrameId;

function getRandomSpeed(maxSpeed) {
  //return maxSpeed;
  return Math.floor(Math.random() < 0.5 ? -maxSpeed : maxSpeed);
}

let angleAdjustmentFactor = 0.2
function updateBall() {
  if (!gameRunning) {
    return;
  }
  // console.log("BallX, BallY")
  // console.log(ballX, ballY)
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  if (
    ballX <= playerWidth && // La pallina è a sinistra del giocatore
    ballY + ballWidth >= player.offsetTop && // La pallina ha superato la parte superiore del giocatore
    ballY <= player.offsetTop + playerHeight // La pallina non ha superato la parte inferiore del giocatore
  ) {
    let hitPos = ballY - (player.offsetTop + playerHeight / 2);
    ballSpeedY = hitPos * angleAdjustmentFactor;
    ballSpeedX = -ballSpeedX;
    if (mouseSpeed *0.1 > ballSpeedX) {
      ballSpeedX += mouseSpeed * 0.1;
    }
    
  }
  else if (
    ballX + ballWidth >= tableWidth - autoplayerWidth && // La pallina è a destra del giocatore destro
    ballY + ballWidth >= autoplayer.offsetTop && // La pallina ha superato la parte superiore del giocatore destro
    ballY <= autoplayer.offsetTop + autoplayerHeight // La pallina non ha superato la parte inferiore del giocatore
  ) {
    let hitPos = ballY - (autoplayer.offsetTop + autoplayerHeight / 2);
    ballSpeedY = hitPos * angleAdjustmentFactor;
    ballSpeedX = -ballSpeedX;
    autoplayerSpeed = tmpSpeed.autospeed
    justScored = false
  }
  else if (ballX <= 0 || ballX >= tableWidth - ballWidth) {
    console.log("set point")
      let position = ballX
      //ballX = tableWidth / 2 - 10;
      //ballY = Math.floor(Math.random() * (tableHeight - 40)) + 20;
      return setPoint(position);
  }
  else if (ballY <= 0 || ballY >= tableHeight - ballWidth ) {
      ballSpeedY = -ballSpeedY;
  }
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;
  moveAutoPlayer()
  animationFrameId = requestAnimationFrame(updateBall); // Chiamata ricorsiva per richiedere il prossimo fotogramma
}


function setPoint(position) {
  if (gameRunning) {
    if (position > 0) {
      player_points++
      playerViewPoint.innerHTML = player_points
    }else{
      auto_points++
      autoViewPoint.innerHTML = auto_points
    }
    nextLevel()
    autoplayerSpeed = 9; //questo garantisce che l'autoplayer possa sempre prendere la pallina al primo turno
    setTimeout(() => {
      cancelAnimationFrame(animationFrameId); // Annulla l'animazione corrente
      ballX = tableWidth / 2 - 10;
      ballY = Math.floor(Math.random() * (tableHeight - 40)) + 20;
      ballSpeedX = getRandomSpeed(ballSpeedX);
      ballSpeedY = getRandomSpeed(ballSpeedY);
      animationFrameId = requestAnimationFrame(updateBall); // Riprende l'animazione*/
    }, 1000);
  } 
}

function movePlayer(y) {
  if (!gameRunning) {
    return;
  }
    y = y - tableHeight;
    if (y > 0 && y < tableHeight - playerHeight) {
        player.style.top = `${y}px`;
        //autoplayer.style.top = `${y}px`;
    }
}

function moveAutoPlayer() {
  autoplayer.style.top = `${Math.max(0, Math.min(tableHeight - autoplayerHeight, autoplayer.offsetTop))}px`;
  //adjustAim();
  if (
    Math.random() < probability && //regola la probabilità che l'autoplayer becchi la pallina
    ballX > tableWidth / 2 //&&
    // ballX < tableWidth - autoplayerWidth &&
    // ballY + ballWidth > autoplayer.offsetTop &&
    // ballY < autoplayer.offsetTop + autoplayerHeight
  ) {
    adjustAim();
  }
}

function adjustAim() {
  const autoplayerCenter = autoplayer.offsetTop + autoplayerHeight / 2;
  const ballCenter = ballY + ballWidth / 2;
  // Regola la mira in base al centro dell'autoplayer e della pallina
  if (ballCenter < autoplayerCenter - autoplayerHeight / 4) {
    autoplayer.style.top = `${Math.max(0, autoplayer.offsetTop - autoplayerSpeed)}px`;
  } else if (ballCenter > autoplayerCenter + autoplayerHeight / 4) {
    autoplayer.style.top = `${Math.min(tableHeight - autoplayerHeight, autoplayer.offsetTop + autoplayerSpeed)}px`;
  }
}

function nextLevel(){
  if ((player_points == 2) && level == 1) { //livello 1 
    level++
    levelView.innerHTML = "Easy easy"
    playerViewPoint.innerHTML = player_points
    autoViewPoint.innerHTML = auto_points
    ballX = tableWidth / 2 - 10;
    ballY = Math.floor(Math.random() * (tableHeight - 40)) + 20;
    ballSpeedX = getRandomSpeed(4);
    ballSpeedY = getRandomSpeed(5);
    tmpSpeed.autospeed = 4
    probability = 0.78
    }
  else if ((player_points == 5) && level == 2) { //livello 2
    level++
    levelView.innerHTML = "Still Easy"
    playerViewPoint.innerHTML = player_points
    autoViewPoint.innerHTML = auto_points
    ballX = tableWidth / 2 - 10;
    ballY = Math.floor(Math.random() * (tableHeight - 40)) + 20;
    ballSpeedX = getRandomSpeed(5);
    ballSpeedY = getRandomSpeed(6);
    tmpSpeed.autospeed = 5
    probability = 0.80
    }
  else if ((player_points == 7) && level == 3) { //livello 3
    level++
    levelView.innerHTML = "Becoming Harder"
    playerViewPoint.innerHTML = player_points
    autoViewPoint.innerHTML = auto_points
    ballX = tableWidth / 2 - 10;
    ballY = Math.floor(Math.random() * (tableHeight - 40)) + 20;
    ballSpeedX = getRandomSpeed(6);
    ballSpeedY = getRandomSpeed(7);
    tmpSpeed.autospeed = 6
    probability = 0.82
    }
  else if ((player_points == 9) && level == 4) { //livello 4
      level++
      levelView.innerHTML = "Harder and Harder"
      playerViewPoint.innerHTML = player_points
      autoViewPoint.innerHTML = auto_points
      ballX = tableWidth / 2 - 10;
      ballY = Math.floor(Math.random() * (tableHeight - 40)) + 20;
      ballSpeedX = getRandomSpeed(7);
      ballSpeedY = getRandomSpeed(8);
      tmpSpeed.autospeed = 7
      probability = 0.92
      }
  else if ((player_points == 11) && level == 5) { //livello 5
    //win
    //cancelAnimationFrame(animationFrameId);
    resetGame()
    alert("You win!")
  }
}

onmousemove = function (e) {
  mouseSpeed = e.clientY - lastMouseY;
  lastMouseY = e.clientY;
  movePlayer(e.clientY);
};

startPauseButton.addEventListener('click', function() {
  gameRunning = !gameRunning;
  this.textContent = gameRunning ? 'Pause' : 'Start';
  if (gameRunning) {
    // Inizia il gioco
    startGame();
  } else {
    // Metti in pausa il gioco
    pauseGame();
  }
});

function startGame() {
  if(!gameRunning){
    return;
  }
  animationFrameId = requestAnimationFrame(updateBall); // Inizia il loop di rendering
}
function resetGame(){
  
  player_points = 0;
  auto_points = 0;
  level = 1;
  playerViewPoint.innerHTML = player_points
  autoViewPoint.innerHTML = auto_points
  levelView.innerHTML = "Easy"
  ballX = tableWidth / 2 - 10;
  ballY = Math.floor(Math.random() * (tableHeight - 40)) + 20;
  ballSpeedX = getRandomSpeed(4);
  ballSpeedY = getRandomSpeed(5);
  tmpSpeed.autospeed = 3
  probability = 0.70
  startPauseButton.click();
}

function pauseGame() {
  cancelAnimationFrame(animationFrameId);
}
// window.addEventListener('load', () => {
//   animationFrameId = requestAnimationFrame(updateBall); // Inizia il loop di rendering
// });
