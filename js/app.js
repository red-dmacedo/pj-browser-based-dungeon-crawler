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
const inventory = data.player.inventory;
const battleLog = data.battleLog;
const enemy = data.enemy;
// const invMenuEl = document.querySelector('#inv-menu');

// ===== Objects =====
const game = {
  startRoom: 25,
  firstEnterableRoom: 22,
  room: 25,
  currentFloor: 1,
  enemyList: [],
  encounterActive: false,
  gameOver: false,

  init: function () {
    game.setMap(game.currentFloor);
    game.toggleMapElEventListener();
    game.renderMap();
    game.updateEnemies();
    enemy.init();
    // enemy.setEnemy('fairy');
    player.init(enemy); // passing enemy object is not ideal, but is used due to deadline approaching
    game.encounterActive = false; // activate or de-activate encounter
    battleLog.clear();
    // player.battle.takeAttack(50, 'fire'); 
  },

  updateEnemies: function () {
    for(let i of Object.values(data.allEnemies)){ // get array of values from data.allEnemies
      if(i.difficultyRating <= game.currentFloor){ game.enemyList.push(i); } // add enemies from the current floor and below
    };
    game.enemyList = [...new Set(game.enemyList)]; // filter out duplicates
  },

  nextFloor: function () {
    if (game.currentFloor <= 3) {
      game.currentFloor += 1;
      game.setMap(game.currentFloor);
    }
  },

  setMap: function (floorNum) {
    let newMap = data.floors[`f${floorNum}`];
    game.clearMap(); // Clear old map data
    game.map[newMap.bossRoom] = data.icons.boss; // Set boss location
    newMap.encounterRooms.forEach((idx) => { game.map[idx] = data.icons.battle }); // Set guaranteed encounters
    newMap.healRooms.forEach((idx) => { game.map[idx] = data.icons.healing }); // Set healing rooms
    newMap.treasureRooms.forEach((idx) => { game.map[idx] = data.icons.treasure }); // Set treasure rooms
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
    for (let i = 0; i < game.map.length; i++) {
      if (game.map[i] === data.icons.player) game.map[i] = "";
    }
    game.map[game.room] = data.icons.player;
  },

  renderMap: function () {
    for (let i = 0; i < data.elem.mapSquares.length; i++) {
      data.elem.mapSquares[i].textContent = game.map[i];
    };
    if (game.room === game.startRoom) return; // prevent highlight when player is in start room
    game.highlightSquare(data.elem.mapSquares[game.room]); // show where the player has been
  },

  movePlayer: function (evt) { // <= player movement and map updates
    if (
      !evt.target.classList.contains("sqr") || // Leave if target was not a square on the map
      !(game.validateMovement(evt.target.id)) || // do nothing if move is not valid
      game.encounterActive || // disallow movement during encounters
      player.isDead || // player has died
      game.gameOver // game is over
    ) return;

    game.room = Number(evt.target.id); // update current room
    
    switch(game.map[game.room]){
      case data.icons.battle:
        game.forceEncounter();
        break;
      case data.icons.boss:
        game.bossBattle();
        break;
      case data.icons.healing:
        game.fullHeal();
        break;
      case data.icons.treasure:
        game.getTreasure();
        break;
      default:
        // game.chanceEncounter();
    };

    // Hide the start square if it is visible
    if (data.elem.startSquare.style.opacity !== 0) data.elem.startSquare.style.opacity = 0;

    game.updateMap();
    game.renderMap();
  },

  fullHeal: function(){
    player.stats.addHp(10000);
    battleLog.newLine('Player has recovered full HP');
  },

  getTreasure: function(){
    let idx = game.randomNumGen(0, Object.keys(data.allItems).length-1);
    let itemName = Object.keys(data.allItems)[idx];
    player.inventory.items.add(itemName);
  },

  forceEncounter: function(){
    let idx = game.randomNumGen(0, game.enemyList.length-1);
    enemy.setEnemy(game.enemyList[idx]);
    game.encounterActive = true;
  },

  bossBattle: function(){
    let selection;
    switch(game.currentFloor){
      case 1:
        selection = data.bossEnemies.bigSlime;
        break;
      case 2:
        selection = data.bossEnemies.frenziedMinotaur;
        break;
      case 3:
        selection = data.bossEnemies.bigSlime;
        break;
    };
    enemy.setEnemy(selection);
    game.encounterActive = true;
  },

  chanceEncounter: function () {
    let num = game.randomNumGen(1,10);
    if(num <= 6) return; // 50% encounter rate
    game.encounterActive = true;
    num = game.randomNumGen(0, game.enemyList.length-1);
    let selectedEnemy = game.enemyList[num];
    console.log(num);
    battleLog.newLine(`${selectedEnemy.name.toUpperCase()} has been encountered. Fight!`);
    enemy.setEnemy(selectedEnemy);
  },

  randomNumGen: function(start, end) {
    return Math.floor(Math.random() * (end-start+1)) + start;
  },

  highlightSquare: function (squareEl, unHighlight = false) {
    (unHighlight) ?
      squareEl.removeAttribute("style") :
      squareEl.setAttribute("style", "background-color: beige");
  },

  toggleMapElEventListener: function (enable = true) {
    (enable) ? // <= ternary
      data.elem.mapEl.addEventListener("click", game.movePlayer) : // <= then statement
      data.elem.mapEl.removeEventListener("click", game.movePlayer); // <= else statement
  },

  validateMovement: function (idx) {
    if (typeof (idx) !== "Number") { idx = Number(idx) };

    if (game.room === game.startRoom && idx === game.firstEnterableRoom) return true; // first move on the map

    let testValue = game.room - idx;

    return (
      (testValue === 1 && idx % 5 !== 4) ||   // move right, unless there is a wall there
      (testValue === -1 && idx % 5 !== 0) ||  // move left, unless there is a wall there
      testValue === 5 ||                      // upwards movement | wall detection is unnecessary
      testValue === -5                        // downwards movement | wall detection is unnecessary
    );
  },
};


// ===== Script =====
game.init();

// inventory.clear();

// console.dir(player);
// let tmp = data.tempObj;
// tmp.init();
// tmp.method3();
// tmp.method2();

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
