// declarations
let direction = { x: 0, y: 0 };
let speed = 14;
let lpt = 0;
let snakearray = [{ x: 16, y: 16 }];
let food = { x: 18, y: 20 };
let score = 0;
let ran = Math.floor(Math.random() * 5);

//sound declairations
const backmusic = new Audio("./assets/sounds/backmusic.mp3");
const foodmusic = new Audio("./assets/sounds/food.mp3");
const gameovermusic = new Audio("./assets/sounds/gameover.mp3");

//functions
function main(ct) {
  window.requestAnimationFrame(main);
  if ((ct - lpt) / 1000 < 1 / speed) {
    return;
  }
  lpt = ct;
  game();
}

function gameover(skarr) {
  for (let i = 1; i < skarr.length; i++) {
    if (skarr[0].x === skarr[i].x && skarr[0].y === skarr[i].y) {
      return true;
    }
  }
  if (
    skarr[0].x >= 31 ||
    skarr[0].x <= 0 ||
    skarr[0].y >= 31 ||
    skarr[0].y <= 0
  ) {
    return true;
  }
}

function foodposition() {
  snakearray.unshift({
    x: snakearray[0].x + direction.x,
    y: snakearray[0].y + direction.y,
  });
  let a = 2;
  let b = 29;
  ran = Math.floor(Math.random() * 5);
  food = {
    x: Math.round(a + (b - a) * Math.random()),
    y: Math.round(a + (b - a) * Math.random()),
  };
  for (i = 0; i < snakearray.length; i++) {
    if (food.x == snakearray[i].x && food.y == snakearray[i].y) {
      foodposition();
      return;
    }
  }
}

function game() {
  //updte snake and food

  //game over
  if (gameover(snakearray)) {
    direction = { x: 0, y: 0 };
    backmusic.pause();
    gameovermusic.play();
    alert("Game Over , press Enter to continue");
    score = 0;
    scorecard.innerHTML = "score : " + score;
    snakearray = [{ x: 16, y: 16 }];
  }

  //extra food for snake
  if (snakearray[0].x === food.x && snakearray[0].y === food.y) {
    foodmusic.play();
    score += 1;
    scorecard.innerHTML = "score : " + score;
    foodposition();
  }

  //to move the snake
  for (let i = snakearray.length - 2; i >= 0; i--) {
    snakearray[i + 1] = { ...snakearray[i] };
  }
  snakearray[0].x += direction.x;
  snakearray[0].y += direction.y;

  snakepad.innerHTML = "";
  //display food
  foodpart = document.createElement("div");
  foodpart.style.gridRowStart = food.y;
  foodpart.style.gridColumnStart = food.x;
  foodpart.classList.add(`food`);
  foodpart.classList.add(`type${ran}`);
  snakepad.appendChild(foodpart);

  //display snake
  snakearray.forEach((e, index) => {
    snakepart = document.createElement("div");
    snakepart.style.gridRowStart = e.y;
    snakepart.style.gridColumnStart = e.x;

    if (index === 0) {
      snakepart.classList.add("head");
    } else {
      snakepart.classList.add("snake");
    }
    snakepad.appendChild(snakepart);
  });
}

//logic
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
   backmusic.play();

  if (e.key === "ArrowUp" && direction.y != 1) {
    direction.x = 0;
    direction.y = -1;
  } 
  else if (e.key === "ArrowLeft" && direction.x != 1) {
    direction.x = -1;
    direction.y = 0;
  } 
  else if (e.key === "ArrowRight" && direction.x != -1) {
    direction.x = 1;
    direction.y = 0;
  } 
  else if (e.key === "ArrowDown" && direction.y != -1) {
    direction.x = 0;
    direction.y = 1;
  }
});
