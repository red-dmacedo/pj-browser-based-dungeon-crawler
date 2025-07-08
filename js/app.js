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
  init: function () {
    console.log('init') // delete me later
    this.clearMap();
    this.map = data.floors.f1.map;
    this.toggleMapElEventListener();
    this.renderMap();
  },

  clearMap: function () {
    console.log("clearMap") // delete me later
    this.map = [
      "", "", "", "", "",
      "", "", "", "", "",
      "", "", "", "", "",
      "", "", "", "", "",
      "", "", "", "", ""
    ]
  },

  updateMap: function (e) {
    e.target.textContent += data.icons.player; // add player icon to current room/square
    this.highlightSquare(e); // show where the player has been
  },

  renderMap: function () {
    for(let i=0;i<data.elem.mapSquares.length;i++){
      data.elem.mapSquares[i].textContent += this.map[i];
    };
  },

  movePlayer: function (e) {
    if (!e.target.classList.contains("sqr")) return; // Leave if target was not on the map
    if(data.elem.startSquare) this.hideStartSquare(); // hide start square

    console.log(e.target.id); // delete me later

    this.updateMap();
  },

  hideStartSquare: function () {
    console.log("hideStartSquare") // delete me later
    data.elem.startSquare.style.opacity = 0;
  },

  showStartSquare: function () {
    data.elem.startSquare.style.opacity = 1;
  },

  highlightSquare: function (e) {
    e.target.setAttribute("style","background-color: beige");
  },

  toggleMapElEventListener: function (enable="true") {
    (enable) ? // <= ternary
      data.elem.mapEl.addEventListener("click", this.movePlayer) : // <= then statement
      data.elem.mapEl.removeEventListener("click", this.movePlayer); // <= else statement
  },
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