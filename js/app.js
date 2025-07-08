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
// const game = {};

// ===== Functions / Methods =====
const game = {
  startRoom: 25,
  firstEnterableRoom: 22,
  room: 25,
  init: function () {
    game.clearMap();
    game.map = data.floors.f1.map;
    game.toggleMapElEventListener();
    game.renderMap();
  },

  clearMap: function () {
    // console.log("clearMap") // delete me later
    game.map = [
      "", "", "", "", "",
      "", "", "", "", "",
      "", "", "", "", "",
      "", "", "", "", "",
      "", "", "", "", ""
    ]
  },

  updateMap: function () {
    for(let i=0; i < game.map.length; i++){
      if (game.map[i] === data.icons.player) game.map[i] = "";
    }
    game.map[game.room] = data.icons.player;
  },

  renderMap: function () {
    for(let i=0;i<data.elem.mapSquares.length;i++){
      data.elem.mapSquares[i].textContent = game.map[i];
    };
    if(game.room === game.startRoom) return; // prevent highlight when player is in start room
    game.highlightSquare(data.elem.mapSquares[game.room]); // show where the player has been
  },

  movePlayer: function (e) { // <= player movement and map updates
    if (
      !e.target.classList.contains("sqr") || // Leave if target was not a square on the map
      !(game.validateMovement(e.target.id)) // do nothing if move is not valid
    ) return;

    game.room = Number(e.target.id); // update current room

    // Hide the start square if it is visible
    if(data.elem.startSquare.style.opacity !== 0) data.elem.startSquare.style.opacity = 0;

    game.updateMap();
    game.renderMap();
  },

  highlightSquare: function (squareEl, unHighlight=false) {
    (unHighlight) ?
      squareEl.removeAttribute("style") :
      squareEl.setAttribute("style","background-color: beige");
  },

  toggleMapElEventListener: function (enable="true") {
    (enable) ? // <= ternary
      data.elem.mapEl.addEventListener("click", game.movePlayer) : // <= then statement
      data.elem.mapEl.removeEventListener("click", game.movePlayer); // <= else statement
  },

  validateMovement: function(idx){
    if( typeof(idx) !== "Number" ){ idx = Number(idx) };

    if( game.room === game.startRoom && idx === game.firstEnterableRoom ) return true; // first move on the map

    let testValue = game.room - idx;

    return (
      (testValue === 1 && idx % 5 !== 4) ||   // move right, unless there is a wall there
      (testValue === -1 && idx % 5 !== 0) ||  // move left, unless there is a wall there
      testValue === 5 ||                      // upwards movement | wall detection is unnecessary
      testValue === -5                        // downwards movement | wall detection is unnecessary
    );
  },

  battleStart(e){},
}
// ===== Script =====
game.init();

/*
  ===== GRAVEYARD =====

function paction1(e){                                                    //  <| - Created to test the
  if(e) toggleMapElEventListener(false);                                 //  <|   toggleMapElEventListener
};                                                                       //  <|   function
document.querySelector("#paction1").addEventListener("click", paction1); //  <| - Disable word wrap!

*/