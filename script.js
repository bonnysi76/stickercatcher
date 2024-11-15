const squares = document.querySelectorAll(".square");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");
let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;
let selectedStickers = [];
let stickerIndex = 0;

function randomSquare() {
  squares.forEach((square) => {
    square.classList.remove("emoji");
    square.style.backgroundImage = '';
  });

  const randomSquare = squares[Math.floor(Math.random() * squares.length)];
  randomSquare.classList.add("emoji");
  randomSquare.style.backgroundImage = `url(${selectedStickers[stickerIndex]})`;
  stickerIndex = (stickerIndex + 1) % selectedStickers.length;
  hitPosition = randomSquare.id;
}

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (square.id == hitPosition) {
      result++;
      score.textContent = result;
      hitPosition = null;
    }
  });
});

function moveEmoji() {
  if (selectedStickers.length) {
    timerId = setInterval(randomSquare, 500);
  }
}

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime == 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    alert(`Game Over! Your final Score Is ${result}`);
  }
}

function selectSticker(stickers) {
  selectedStickers = stickers;
  stickerIndex = 0;
  if (!timerId) {
    moveEmoji();
    countDown();
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

let countDownTimerId = setInterval(countDown, 1000);
