const inputSize = document.querySelector('.size__input');
const tableGame = document.querySelector("tbody");

let sizeMap = +inputSize.value;


inputSize.addEventListener('input', (e) => {
  tableGame.innerHTML = "";
  sizeMap = +e.target.value;
  genMap();
})

function genMap() {
  tableGame.innerHTML = "";
  
  for (let i = 0; i < sizeMap; i++) {
    tableGame.insertAdjacentHTML("afterbegin", `<tr class="trow"></tr>`);
  }

  const trow = document.querySelectorAll(".trow");

  for (let j = 0; j < trow.length; j++) {
    let strCode = "";

    for (let z = 0; z < sizeMap; z++) {
      strCode += `<td class="tdata"></td>`;
    }
    trow[j].insertAdjacentHTML("afterbegin", strCode);
  }
}

genMap();






