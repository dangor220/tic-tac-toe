const alertForm = document.querySelector(".wrapper__alert");
const alertText = document.querySelector(".wrapper__text");
const step = document.querySelector(".wrapper__step");
let results = [];

function winGame(winner, flag) {
  if (flag === false && winner !== undefined) {
    function reset() {
      if (winner === "x") {
        let audioWin = new Audio();
        audioWin.src = "./asssets/winner.mp3";

        function audioWinner() {
          audioWin.play();
        }

        audioWinner();
      }

      if (winner === "o") {
        let audioLose = new Audio();
        audioLose.src = "./asssets/lose.mp3";

        function audioWinner() {
          audioLose.play();
        }

        audioWinner();
      }

      alertForm.classList.remove("wrapper__alert_hidden");
      alertText.innerHTML = "";
      alertText.insertAdjacentText(
        "afterbegin",
        `${winner} - победил, сыграть снова?`
      );
      results.push(winner);
      localStorage.setItem(`resultsDANGOR220`, results);

      step.innerHTML = "";
      if (winner === "x") {
        step.insertAdjacentHTML(
          "afterbegin",
          `Количество ходов: <span class="step">${sumStepX}</span>`
        );
      }
      if (winner === "o") {
        step.insertAdjacentHTML(
          "afterbegin",
          `Количество ходов: <span class="step">${sumStepO}</span>`
        );
      }
    }

    reset();
  }
}

alertForm.addEventListener("click", (e) => {
  if (e.target.classList.contains("wrapper__button-yes")) {
    sumStepX = 0;
    sumStepO = 0;

    genMap();
    startGame();
  }
  if (e.target.classList.contains("wrapper__button-no")) {
    sumStepX = 0;
    sumStepO = 0;
    genMap();
    mainMenu.classList.remove("main__menu_hidden");
    wrapGame.classList.add("wrapper__game_hidden");
    alertForm.classList.add("wrapper__alert_hidden");
    tableList.innerHTML = "";

    let res = localStorage.getItem("resultsDANGOR220");
    let resArr = res.split(",");

    for (let [key, value] of Object.entries(resArr)) {
      if (value === "ничья") {
        tableList.insertAdjacentHTML(
          "afterbegin",
          `<div class="table__list-item"><div class="winner__round">В ${
            +key + 1
          } игре:</div><div class="winner__player">${value}</div></div>`
        );
      } else {
        tableList.insertAdjacentHTML(
          "afterbegin",
          `<div class="table__list-item"><div class="winner__round">В ${
            +key + 1
          } игре победил:</div><div class="winner__player">${value}</div></div>`
        );
      }
    }
  }
});

const clear = document.querySelector(".clear");

clear.addEventListener("click", () => {
  tableList.innerHTML = "";
  if (localStorage.length) {
    localStorage.clear();
    results = [];
  }
  tableList.classList.add("table__list-hide");
});
