let columnsize = 6;
let rowsize = 6;

let target;
let currentsum = 0;
let grid = [];
let score = 0;

const addcells = () => {
  let arr = [];
  for (let i = 0; i < columnsize; i++) {
    let obj = {};
    obj.value = Math.ceil(Math.random() * 9);
    obj.selected = false;
    arr.push(obj);
  }
  grid.unshift(arr);
};

let getId = (i, j) => {
  return i.toString() + j.toString();
};

const updateboard = () => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const el = document.getElementById(getId(i, j));
      el.innerHTML = grid[i][j].value;

      if (grid[i][j].selected === true) {
        el.classList.add("selected");
      } else if (el.classList.contains("selected")) {
        el.classList.remove("selected");
      }
    }
  }
};

const gameover = () => {
  if (grid.length < rowsize) return false;
  for (let i = 0; i < columnsize; i++) {
    if (grid[rowsize - 1][i].value !== "") {
      return true;
    }
  }
  return false;
};

const startnewgame = () => {
  grid = [];
  let el = document.getElementById("cell-container");
  document.getElementById("board").removeChild(el);
  initGame();
  startimer();
  currentsum = "";
  document.getElementById("currentsum").innerHTML = currentsum;
};
// const win = () => {
//   let el = document.getElementById("winner");
//   el.classList.add("winner");
// };
let startimer = () => {
  let id = setInterval(() => {
    if (gameover()) {
      alert("game over");
      clearInterval(id);
      startnewgame();
      return;
    }
    addcells();
    updateboard();
  }, 10000);
};

startimer();
const intitTarget = () => {
  target = 10 + Math.ceil(Math.random() * 50);
  document.getElementById("target").innerHTML = target;
};

const updatescore = (score) => {
  currentsum = 0;
  document.getElementById("score").innerHTML = `Score : ${score}`;
};

const deselectelements = () => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j].selected = false;
    }
  }
};

let removeAllSelected = () => {
  let count = 0;
  currentsum = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j].selected === true) {
        count++;
        grid[i][j].value = "";
        grid[i][j].selected = false;
      }
    }
  }

  // updateboard();
  return count;
};

// let rearrangeBoard = () => {
//   for (let i = 0; i < 6; i++) {
//     for (let j = 0; j < grid.length; j++) {
//       if (grid[i][j].value === "") {
//         grid[i].slice(j, j + 1);

//       }
//     }
//   }
// };

const handleclick = (event, i, j) => {
  if (grid[i][j].value === "") {
    return;
  }
  grid[i][j].selected = !grid[i][j].selected;

  if (grid[i][j].selected) {
    currentsum += grid[i][j].value;
  } else {
    currentsum -= grid[i][j].value;
  }
  if (currentsum > target) {
    currentsum = 0;
    deselectelements();
  } else if (currentsum === target) {
    let noofremovecells = removeAllSelected();
    console.log(removeAllSelected());
    score += noofremovecells;

    //rearrangeBoard();
    intitTarget();
    updatescore(score);
    // updateboard();
  }
  document.getElementById("currentsum").innerHTML = currentsum;
  updateboard();
};

const initGame = () => {
  let board = document.getElementById("board");
  let cellcontainer = document.createElement("div");
  cellcontainer.setAttribute("id", "cell-container");
  for (let i = 0; i < rowsize; i++) {
    let row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < columnsize; j++) {
      let cell = document.createElement("div");
      cell.setAttribute("id", getId(i, j));
      cell.setAttribute("selected", false);
      cell.className = "cell center";
      cell.addEventListener("click", (event) => handleclick(event, i, j));
      row.appendChild(cell);
    }
    cellcontainer.appendChild(row);
  }
  board.appendChild(cellcontainer);
  intitTarget();
  updatescore(score);
};
initGame();
