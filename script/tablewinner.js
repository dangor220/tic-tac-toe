const tableWinner = document.querySelector(".table__winner");
const tableList = document.querySelector(".table__list");

tableWinner.addEventListener("click", () => {
  tableList.classList.toggle("table__list-hide");
});

window.addEventListener("load", () => {
  let res = localStorage.getItem("resultsDANGOR220");

  if (res) {
    let resArr = res.split(",");
    results = resArr;

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
