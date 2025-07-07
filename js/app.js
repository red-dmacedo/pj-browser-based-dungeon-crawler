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
game.init = function (){
  console.log('init')
  clearMap();
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
  for(let idx=0;idx<data.elem.mapSquares.length;idx++){
    data.elem.mapSquares[idx].textContent += game.map[idx];
  };
  // console.dir(game.map);
};

function movePlayer(e){
  if (!e.target.classList.contains("sqr")) return;
  console.log(e.target.id);
  e.target.textContent += data.icons.player;
  highlightSquare(e);
};

function highlightSquare(e){
  e.target.setAttribute("style","background-color: beige")
}

function toggleMapElEventListener(enable="true"){
  (enable) ? // <= ternary
    data.elem.mapEl.addEventListener("click", movePlayer) : // <= then statement
    data.elem.mapEl.removeEventListener("click", movePlayer); // <= else statement
}

// ===== Script =====
// game.init();
toggleMapElEventListener();

/*
GRAVEYARD

function paction1(e){                                                    //  <| - Created to test the
  if(e) toggleMapElEventListener(false);                                 //  <|   toggleMapElEventListener
};                                                                       //  <|   function
document.querySelector("#paction1").addEventListener("click", paction1); //  <| - Disable word wrap!

*/