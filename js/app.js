import * as data from "./data.js"

/*
map
[
  0,  1,  2,  3,  4,
  5,  6,  7,  8,  9,
  10, 11, 12, 13, 14,
  15, 16, 17, 18, 19,
  20, 21, 22, 23, 24
]
*/

// ===== Variables =====
// initialize game object
const game = {};

// ===== Functions =====
function init(){
  game.map = data.floors.f1.map
  renderMap();
};

function clearMap(){
  game.map = [
    "", "", "", "", "",
    "", "", "", "", "",
    "", "", "", "", "",
    "", "", "", "", "",
    "", "", "", "", ""
  ]
};

function updateMap(){
  // placeholder
};

function renderMap(){
  for(let idx=0;idx<data.mapElements.length;idx++){
    // console.log(data.mapElements[idx].id)
    data.mapElements[idx].textContent += game.map[idx];
    
  };
  console.dir(game.map)
};

function movePlayer(e){
  if (!e.target.classList.contains("sqr")) return;
  console.log(e.target.id);
  highlightSquare(e);
};

function highlightSquare(e){
  e.target.setAttribute("style","background-color: beige")
}
// ===== Script =====
init();
data.mapEl.addEventListener("click", movePlayer);