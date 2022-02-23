const mainMenu = document.querySelector(".main__menu");
const wrapGame = document.querySelector(".wrapper__game");
const tableAnimation = document.querySelector(".table__game");
const logo = document.querySelector(".soundBar");

logo.addEventListener("click", (e) => {
  e.target.classList.toggle("play__sound");

  if (e.target.classList.contains("play__sound")) {
    e.target.classList.add("sound__active-anim");
    backMusicPlay();
  } else {
    e.target.classList.remove("sound__active-anim");
    backMusicStop();
  }
});

let backMusic = new Audio();
backMusic.src = "./asssets/background.mp3";

function backMusicPlay() {
  backMusic.play();
  backMusic.autoplay = true;
  backMusic.loop = true;
}
function backMusicStop() {
  backMusic.pause();
}

let typeGame;

mainMenu.addEventListener("click", (e) => {
  if (e.target.classList.contains("game__with__pc")) {
    typeGame = false;
    tableList.classList.add("table__list-hide");
    startGame();
  }
  if (e.target.classList.contains("game__with__player")) {
    typeGame = true;
    tableList.classList.add("table__list-hide");
    startGame();
  }
});
