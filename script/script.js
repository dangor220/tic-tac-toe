let sumStepX = 0;
let sumStepO = 0;

function startGame() {
  tableAnimation.classList.add("animation");
  mainMenu.classList.add("main__menu_hidden");
  wrapGame.classList.remove("wrapper__game_hidden");
  alertForm.classList.add("wrapper__alert_hidden");

  const currentData = document.querySelector(".table__game");

  const tableNum = document.querySelectorAll("td").length;

  const row = Math.sqrt(tableNum);

  const x = '<span class="x">x</span>';
  const o = '<span class="x">o</span>';

  const arrStep = [];

  for (let i = 0; i < tableNum; i++) {
    if (i % 2 === 0) {
      arrStep.push(x);
    } else {
      arrStep.push(o);
    }
  }

  let countStep = 0;
  let flag = true;

  let audioStep = new Audio();
  audioStep.src = "./asssets/step.mp3";

  function audioStepPlay() {
    audioStep.play();
  }

  // let typeGame = false;

  // game with two player typeGame === true
  currentData.addEventListener("click", (e) => {
    let tableNode = document.querySelectorAll("td");
    // let animXClick = document.querySelectorAll(".x");

    // animXClick.ad

    if (
      e.target.tagName === "TD" &&
      e.target.textContent === "" &&
      arrStep.length !== 0 &&
      typeGame &&
      flag
    ) {
      if (arrStep[0] === '<span class="x">x</span>') {
        sumStepX += 1;
      }
      if (arrStep[0] === '<span class="x">o</span>') {
        sumStepO += 1;
      }
      audioStepPlay();
      e.target.innerHTML = arrStep[0];
      arrStep.shift(0);
    }

    if (
      e.target.tagName === "TD" &&
      e.target.textContent === "" &&
      !typeGame &&
      flag
    ) {
      e.target.innerHTML = x;
      audioStepPlay();
      sumStepX += 1;
      countStep += 1;

      function getRandom() {
        let randomNum = Math.floor(Math.random() * tableNum);

        if (tableNode[randomNum].textContent === "") {
          if (flag === true) {
            tableNode[randomNum].innerHTML = o;
            audioStepPlay();
            sumStepO += 1;
            countStep += 1;
          }
          return;
        }
        getRandom();
      }

      if (countStep < tableNum) {
        if (flag === true) {
          getRandom();
        }
      }
    }

    let resArr = [...tableNode].map((item) => {
      return item.textContent;
    });

    let matrix = [];

    for (let i = 0; i < row; i++) {
      matrix[i] = [];
      for (let j = 0; j < row; j++) {
        matrix[i].push(resArr.shift(j));
      }
    }

    // First check

    function rowCheck(matrix) {
      let winner;
      matrix.forEach((arr) => {
        let count = 1;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === arr[i + 1] && arr[i] !== "" && arr[i + 1] !== "") {
            count += 1;
            if (count === sizeMap) {
              winner = arr[i];
              flag = false;
            }
          } else {
            return false;
          }
        }
      });
      winGame(winner, flag);
    }

    rowCheck(matrix);

    // Second check

    const transpose = (value) =>
      value[0].map((col, i) => value.map((row) => row[i]));
    const transposedMatrix = transpose(matrix);

    rowCheck(transposedMatrix);

    // Third check

    function diagonalCheck(matrix) {
      let diagonal = [];
      let winner;

      for (let i = 0; i < row; i++) {
        diagonal.push(matrix[i][i]);
      }

      let number = 1;

      for (let i = 0; i < diagonal.length; i++) {
        if (
          diagonal[i] === diagonal[i + 1] &&
          diagonal[i] !== "" &&
          diagonal[i + 1] !== ""
        ) {
          number += 1;
          if (number === sizeMap) {
            winner = diagonal[i];
            flag = false;
          }
        } else {
          return false;
        }
        winGame(winner, flag);
      }
    }

    diagonalCheck(matrix);

    // Fhour check

    let reverseMatrix = matrix.map((item) => {
      return item.reverse();
    });
    diagonalCheck(reverseMatrix);

    // Five check

    let resultArr = [];

    matrix.forEach((item) => {
      item.forEach((i) => {
        resultArr.push(i);
      });
    });

    if (!resultArr.includes("") && flag) {
      flag = false;

      let audioLose = new Audio();
      audioLose.src = "./asssets/lose.mp3";

      function audioWinner() {
        audioLose.play();
      }

      audioWinner();

      alertForm.classList.remove("wrapper__alert_hidden");
      alertText.innerHTML = "";
      alertText.insertAdjacentText("afterbegin", `Ничья! Сыграть снова?`);
      step.innerHTML = "";

      results.push("ничья");
      localStorage.setItem(`resultsDANGOR220`, results);
    }
  });
}
