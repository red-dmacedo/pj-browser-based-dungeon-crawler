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
const player = data.player;
const inventory = data.inventory;
// const invMenuEl = document.querySelector('#inv-menu');

// ===== Functions / Methods =====

game.init();

const game = {
  startRoom: 25,
  firstEnterableRoom: 22,
  room: 25,
  currentFloor: 1,

  init: function () {
    game.setMap(game.currentFloor);
    player.init();
    game.toggleMapElEventListener();
    game.renderMap();
    inventory.init(player);
    // inventory.invEl.addEventListener("click", inventory.swapInventory);
    // inventory.addCommandBtn('temp1');
    // invMenuEl.addEventListener("click", invSwitcher);
    document.addEventListener("DOMContentLoaded", game.onPageLoad);
  },

  nextFloor: function(){
    if( game.currentFloor <= 3 ) {
      game.currentFloor += 1;
      game.setMap(game.currentFloor);
    }
  },

  onPageLoad: function(){
    data.inventory.menu.skillsBtnEl.click(); // Click skill button
  },

  setMap: function(floorNum){
    let newMap = data.floors[`f${floorNum}`];
    game.clearMap(); // Clear old map data
    game.map[newMap.bossLocation] = data.icons.boss; // Set boss location
    newMap.encounterRooms.forEach( (idx) => { game.map[idx] = data.icons.battle }); // Set guaranteed encounters
  },

  clearMap: function () {
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

  movePlayer: function (evt) { // <= player movement and map updates
    if (
      !evt.target.classList.contains("sqr") || // Leave if target was not a square on the map
      !(game.validateMovement(evt.target.id)) // do nothing if move is not valid
    ) return;

    game.room = Number(evt.target.id); // update current room

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

  toggleMapElEventListener: function ( enable = true ) {
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

  battleStart(evt){},
}

// function clearInvBtns(){
//   fetchInvBtnEls();
//   invBtnEls.forEach( (el) => { el.remove(); });
//   fetchInvBtnEls();
// };

// function fetchInvBtnEls(){
//   invBtnEls = document.querySelectorAll('#inventory button'); // global variable
// };

// function invSwitcher(evt){
//   const btnNames = ['Skills', 'Items', 'Equipment'];
//   if( !(btnNames.includes(v.target.textContent)) ) return; // Exit if button is not in the list

//   document.querySelectorAll('.inv-menu-btn').forEach( (el) => { el.classList.remove("highlight-btn") }); // Remove highlight-btn class from all menu items

//   evt.target.classList.add( "highlight-btn" ) // highlight selected button

//   let useList;
//   inventory.clearCommandBtns();
//   switch( evt.target.textContent ) {
//     case btnNames[0]: {
//       useList = player.skillList;
//       break;
//     };
//     case btnNames[1]: {
//       useList = player.items;
//       break;
//     };
//     case btnNames[2]: {
//       useList = player.equipment;
//       break;
//     };
//     default: {
//       console.log(`invSwitcher: No case for ${evt.target.textContent}`);
//       return; // leave function
//     };
//   };
//   useList.forEach( (i) => { inventory.addCommandBtn(i.name); })
// };

function useItems(evt){
  item = data.allItems[evt.target.textContent]
  if( !item ) return; // return if selection is NOT an item

  switch(item.type){
    case "consumable": {};
    case "equipment": {
      // player.
    };
  };
};
// ===== Script =====
game.init();

player.addItems("sword_I","hp_potion_I","mp_potion_I");

// clearInvBtns();
// player.setXp(302);
// player.setXp(300);

// data.enemy.setEnemy("slime");
// player.setLv(5);
// player.lvUpCheck();

/*
  ===== GRAVEYARD =====

function paction1(evt){                                                    //  <| - Created to test the
  if(evt) toggleMapElEventListener(false);                                 //  <|   toggleMapElEventListener
};                                                                       //  <|   function
document.querySelector("#paction1").addEventListener("click", paction1); //  <|


for( let i=0; i<20; i++ ){ data.battleLog.newLogItem(`battle text ${i}`); }; // Add temp battleLogItems

// player.addItems("sword_I","hp_potion_I","mp_potion_I"); // test items

*/