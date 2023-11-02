let vBoard = [];
const player1 = document.querySelector("input[name='player1']");
const player2 = document.getElementById("player2");
const p = document.getElementById("turn-player");
const boardsInputs = document.querySelectorAll(".board-input");

document.getElementById("start-game").addEventListener("click", () => {
  console.clear();
  vBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  p.innerHTML = 'Vez do Jogador(a) <span id="show-name"></span>';
  const span = document.getElementById("show-name");
  player1.disabled = true;
  player2.disabled = true;

  span.innerText = player1.value;
  boardsInputs.forEach((item) => {
    item.innerText = "";
    item.classList.remove("win");
    item.addEventListener("click", makeAPlay);
  });
});

function makeAPlay(ev) {
  const target = ev.currentTarget;
  const span = document.getElementById("show-name");
  const index = target.dataset.index;
  const arrayIndex = index.split(".");
  const row = arrayIndex[0];
  const column = arrayIndex[1];

  try {
    if (span.innerText === player1.value) {
      target.innerText = "X";
      vBoard[row][column] = "X";
      console.clear();
      console.table(vBoard);
      target.removeEventListener("click", makeAPlay);
    } else {
      target.innerText = "O";
      vBoard[row][column] = "O";
      console.clear();
      console.table(vBoard);
      target.removeEventListener("click", makeAPlay);
    }
  } catch (error) {
    alert("Jogo encerrado! Favor iniciar nova partida.");
  }

  const winRegions = showWinRegions();

  if (winRegions.length > 0) {
    winRegions.forEach((item) => {
      document.querySelector(`span[data-index='${item}']`).classList.add("win");
    });
    player1.disabled = false;
    player2.disabled = false;
    p.innerHTML = `Jogador(a) ${span.innerText} venceu!`;
    return;
  } else if (vBoard.flat().includes("")) {
    changePlayer(span, player1.value, player2.value);
  } else {
    player1.disabled = false;
    player2.disabled = false;
    p.innerHTML = "EMPATE!";
  }
}

function showWinRegions() {
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[0][1] &&
    vBoard[0][0] === vBoard[0][2]
  ) {
    return ["0.0", "0.1", "0.2"];
  } else if (
    vBoard[1][0] &&
    vBoard[1][0] === vBoard[1][1] &&
    vBoard[1][0] === vBoard[1][2]
  ) {
    return ["1.0", "1.1", "1.2"];
  } else if (
    vBoard[2][0] &&
    vBoard[2][0] === vBoard[2][1] &&
    vBoard[2][0] === vBoard[2][2]
  ) {
    return ["2.0", "2.1", "2.2"];
  } else if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][0] &&
    vBoard[0][0] === vBoard[2][0]
  ) {
    return ["0.0", "1.0", "2.0"];
  } else if (
    vBoard[0][1] &&
    vBoard[0][1] === vBoard[1][1] &&
    vBoard[0][1] === vBoard[2][1]
  ) {
    return ["0.1", "1.1", "2.1"];
  } else if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][2] &&
    vBoard[0][2] === vBoard[2][2]
  ) {
    return ["0.2", "1.2", "2.2"];
  } else if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][1] &&
    vBoard[0][0] === vBoard[2][2]
  ) {
    return ["0.0", "1.1", "2.2"];
  } else if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][1] &&
    vBoard[0][2] === vBoard[2][0]
  ) {
    return ["0.2", "1.1", "2.0"];
  } else {
    return [];
  }
}

function changePlayer(element, value1, value2) {
  element.innerText = element.innerText === value1 ? value2 : value1;
}
