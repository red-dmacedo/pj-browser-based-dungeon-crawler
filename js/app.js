import * as data from "./data.js"

/* Map representation
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
const player = data.player; // object
const battleLog = data.battleLog; // object
const map = data.map; // object
const rollNum = data.rollNum; // function
const enemy = data.enemy; // object

// ===== Script =====
// game.init();
// document.querySelector('#reset').addEventListener("click", game.init());

/* ===== GRAVEYARD =====

function paction1(evt){                                                  //  <| - Created to test the
  if(evt) toggleMapElEventListener(false);                               //  <|   toggleMapElEventListener
};                                                                       //  <|   function
document.querySelector("#paction1").addEventListener("click", paction1); //  <|


for( let i=0; i<20; i++ ){ data.battleLog.newLogItem(`battle text ${i}`); }; // Add temp battleLogItems

// player.addItems("sword_I","hp_potion_I","mp_potion_I"); // test items

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
*/


/* game object
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
    game.currentFloor = 1;
    game.encounterActive = false;
    game.gameOver = false;
    game.room = 25;
    game.clearHighlightedSquares();
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

  fullHeal: function(){
    player.stats.addHp(10000);
    battleLog.newLine('Player has recovered full HP');
  },

  getTreasure: function(){
    let idx = game.randomNumGen(0, Object.keys(data.allItems).length-1);
    let itemName = Object.keys(data.allItems)[idx];
    player.inventory.items.add(itemName);
    battleLog.newLine(`Player recieved ${itemName}`);
  },

  forceEncounter: function(){
    let idx = game.randomNumGen(0, game.enemyList.length-1);
    enemy.setEnemy(game.enemyList[idx]);
    game.encounterActive = true;
    player.encounterActive = true;
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
    player.encounterActive = true;
  },

  chanceEncounter: function () {
    let num = game.randomNumGen(1,10);
    if(num <= 6) return; // 50% encounter rate
    game.encounterActive = true;
    num = game.randomNumGen(0, game.enemyList.length-1);
    let selectedEnemy = game.enemyList[num];
    battleLog.newLine(`${selectedEnemy.name.toUpperCase()} has been encountered. Fight!`);
    enemy.setEnemy(selectedEnemy);
  },

  toggleMapElEventListener: function (enable = true) {
    (enable) ? // <= ternary
      data.elem.mapEl.addEventListener("click", game.movePlayer) : // <= then statement
      data.elem.mapEl.removeEventListener("click", game.movePlayer); // <= else statement
  },
};
*/
