let isAutoPlaying = false;
let intervalId;
let score = {
  wins: 0,
  losses: 0,
  ties: 0
};
document.querySelector(".js-auto-play-button").addEventListener("click", autoPlay);
document.querySelector(".js-auto-play-button").addEventListener("keydown", (event) => {
  if (event.key === 'a') autoPlay();
});
document.querySelector(".js-rock-button").addEventListener("click", () => makeMove("rock"));
document.querySelector(".js-paper-button").addEventListener("click", () => makeMove("paper"));
document.querySelector(".js-scissors-button").addEventListener("click", () => makeMove("scissors"));
document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") makeMove("rock");
  else if (event.key === "p") makeMove("paper");
  else if (event.key === "s") makeMove("scissors");
});
document.querySelector('.js-reset-score-button').addEventListener('click', showPopup);
document.querySelector('.js-yes-button').addEventListener('click', () => resetScore(true));
document.querySelector('.js-no-button').addEventListener('click', () => resetScore(false));
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      makeMove(pickComputerMove());
    }, 1000);
    document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
    isAutoPlaying = false;
  }
}
function makeMove(playerMove) {
  const computerMove = pickComputerMove();
  const resultElement = document.querySelector('.js-result');
  if (playerMove === computerMove) {
    resultElement.innerHTML = `Tie.`;
    score.ties += 1;
  } else if (
    (playerMove === 'rock' && computerMove === 'scissors') ||
    (playerMove === 'paper' && computerMove === 'rock') ||
    (playerMove === 'scissors' && computerMove === 'paper')
  ) {
    resultElement.innerHTML = `You win.`;
    score.wins += 1;
  } else {
    resultElement.innerHTML = `You lose.`;
    score.losses += 1;
  }
  const movesElement = document.querySelector('.js-moves-chosen');
  movesElement.innerHTML = `
    You
    <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">
    Computer
  `;
  updateScoreElement();
  localStorage.setItem('score', JSON.stringify(score));
}
function showPopup() {
  document.querySelector('.js-reset-score-popup').style.display = 'block';
}
function resetScore(confirmed) {
  if (confirmed) {
    score = {
      wins: 0,
      losses: 0,
      ties: 0
    };
    updateScoreElement();
    localStorage.removeItem('score');
  }
  document.querySelector('.js-reset-score-popup').style.display = 'none';
}
function pickComputerMove() {
  const randomNumber = Math.random();
  if (randomNumber < (1 / 3)) return 'rock';
  else if (randomNumber < (2 / 3)) return 'paper';
  else return 'scissors';
}
function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `
    Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}
  `;
}
const savedScore = JSON.parse(localStorage.getItem('score'));
if (savedScore) {
  score = savedScore;
}
updateScoreElement();