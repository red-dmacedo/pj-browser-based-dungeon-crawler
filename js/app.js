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
// const player = data.player;
// const inventory = data.inventory;
// const invMenuEl = document.querySelector('#inv-menu');

// ===== Objects =====
// player and player.inventory objects are better defined as classes.
const player = {
  firstLv: 1,
  lastLv: 5,
  lv: 1,
  baseAtk: 100,
  hp: 5,
  mp: 5,
  xp: 0,
  maxHp: 10,
  maxMp: 10,
  maxXp: 10,
  icon: data.icons.player,
  equipment: [],
  skillList: [],
  items: [],

  levels: {
    lv1: { name: "Lv1", startingXp: 0, maxXp: 100, maxHp: 100, maxMp: 100, newSkills: ["slash_I", "nudge", "water",], },
    lv2: { name: "Lv2", startingXp: 0, maxXp: 300, maxHp: 120, maxMp: 120, newSkills: ["slash_II", "lightning",], },
    lv3: { name: "Lv3", startingXp: 0, maxXp: 300, maxHp: 140, maxMp: 140, newSkills: ["fire",], },
    lv4: { name: "Lv4", startingXp: 0, maxXp: 500, maxHp: 160, maxMp: 160, newSkills: ["slash_III",], },
    lv5: { name: "Lv5", startingXp: 0, maxXp: 1000, maxHp: 200, maxMp: 200, newSkills: ["slash_IV",], },
  },

  playerEls: {
    hpEl: document.querySelector('#player-hp'),
    mpEl: document.querySelector('#player-mp'),
    xpEl: document.querySelector('#player-xp'),
    lvEl: document.querySelector('#player-lv'),
  },

  displayHp: function () {
    this.playerEls.hpEl.textContent = `${this.hp}/${this.maxHp}`;
  },

  displayMp: function () {
    this.playerEls.mpEl.textContent = `${this.mp}/${this.maxMp}`;
  },

  displayXp: function () {
    this.playerEls.xpEl.textContent = `${this.xp}/${this.maxXp}`;
  },

  displayLv: function () {
    this.playerEls.lvEl.textContent = this.lv;
  },

  displayStats: function () {
    this.displayHp();
    this.displayMp();
    this.displayXp();
    this.displayLv();
  },

  init: function (lv = 1) {
    this.setLv(lv);
  },

  setLv: function (num) {
    if (num > 5) num = 5; // fix outrageous numbers
    if (num < 1) num = 1; // fix outrageous numbers
    if (!(this.levels[`lv${num}`])) return; // exit if level is not found
    this.lv = num;
    let newLevel = this.levels[`lv${this.lv}`];
    this.displayLv();
    // Xp
    this.maxXp = newLevel.maxXp;
    let excessXp = this.xp - this.maxXp;
    (excessXp > 0) ?
      this.setXp(excessXp) :
      this.setXp(newLevel.startingXp);
    // HP
    this.maxHp = newLevel.maxHp;
    this.setHp(this.maxHp);
    // MP
    this.maxMp = newLevel.maxMp;
    this.setMp(this.maxMp);
    // new skills
    for (let i = 1; i <= num; i++) { // <= add skills from previous levels
      let lvObj = this.levels[`lv${i}`];
      lvObj.newSkills.forEach(skillname => { this.addSkill(skillname) });
    };
    this.removeSkillDuplicates();
    this.sortSkills();
  },

  removeSkillDuplicates: function () {
    this.skillList = [...new Set(this.skillList)];
  },

  addSkill: function (name) {
    let skill = data.skills[name];
    if (skill) this.skillList.push(skill);
  },

  sortArrayByNameProperty: function (arr) {
    arr.sort((a, b) => a.name.localeCompare(b.name));
  },

  sortEquipment: function () {
    this.sortArrayByNameProperty(this.equipment);
  },

  sortItems: function () {
    this.sortArrayByNameProperty(this.items);
  },

  sortSkills: function () {
    this.sortArrayByNameProperty(this.skillList);
  },

  addItems: function (...names) {
    for (let i of names) {
      let item = data.allItems[i];
      switch (item.type) {
        case "consumable":
          this.items.push(item);
          break;
        case "equipment":
          this.equipment.push(item);
          break;
      };
    };
    this.sortItems();
    this.sortEquipment();
  },

  lvUpCheck: function () {
    if (this.xp < this.maxXp) return; // leave if xp is not sufficient
    this.setLv(this.lv + 1)
  },

  setHp: function (num) {
    this.hp = num;
    if (this.hp > this.maxHp) this.hp = this.maxHp; // prevent going over the cap
    this.displayHp();
  },

  setMp: function (num) {
    this.mp = num;
    if (this.mp > this.maxMp) this.mp = this.maxMp; // prevent going over the cap
    this.displayMp();
  },

  setXp: function (num) {
    this.xp = num;
    this.lvUpCheck();
    this.displayXp();
  },

  addHp: function (num) {
    this.hp += num;
    if (this.hp > this.maxHp) this.hp = this.maxHp; // prevent going over the cap
    this.displayHp();
  },

  addMp: function (num) {
    this.mp += num;
    if (this.mp > this.maxMp) this.mp = this.maxMp; // prevent going over the cap
    this.displayMp();
  },

  addXp: function (num) {
    this.xp += num; // add xp
    this.lvUpCheck(); // check for level up
    this.displayXp(); // display result to html
  },

  useSkill: function (name) {
    let skill = skills[name];
    this.mp = this.mp - skill.mpCost
  },
};

const inventory = {
  commandBtnEls: document.querySelectorAll('#inventory button'),
  invEl: document.querySelector('#inventory'),

  menu: {
    invMenuEl: document.querySelector('#inv-menu'),
    skillsBtnEl: document.querySelector('#inv-skills-btn'),
    itemsBtnEl: document.querySelector('#inv-items-btn'),
    equipmentBtnEl: document.querySelector('#inv-equipment-btn'),
  },

  init: function () {
    this.clearCommandBtns();
    // this.addItems('hp_potion_I','hp_potion_I','hp_potion_I','mp_potion_I','mp_potion_I');
    this.clear();
  },

  clearCommandBtns: function () {
    this.commandBtnEls.forEach(el => el.remove());
  },

  clear: function () {
    player.items.length = 0;
    player.equipment.length = 0;
  },

  loadNewCommandBtns: function () {
    this.commandBtnEls = document.querySelectorAll('#inventory button')
  },

  addCommandBtn: function (text) {
    let nBtn = document.createElement('button');
    nBtn.type = 'button';
    nBtn.classList.add('inv-btn');
    nBtn.textContent = text;
    this.invEl.appendChild(nBtn);
  },

  swapInventory: function (evt) {
    const btnNames = ['Skills', 'Items', 'Equipment'];
    if (!(btnNames.includes(evt.target.textContent))) return; // Exit if button is not in the list
    // Button Highlights
    document.querySelectorAll('.inv-menu-btn').forEach((el) => { el.classList.remove("highlight-btn") }); // Remove highlight-btn class from all menu items
    evt.target.classList.add("highlight-btn") // highlight selected button
    // Determine list
    inventory.loadNewCommandBtns();
    inventory.clearCommandBtns(); // clear old buttons
    let list;
    switch (evt.target.textContent) {
      case btnNames[0]:
        // console.dir(player.skillList);
        list = player.skillList;
        break;
      case btnNames[1]:
        list = player.items;
        break;
      case btnNames[2]:
        list = player.equipment;
        break;
      default:
        console.log(`swapInventory: No case for ${evt.target.textContent}`);
        return; // leave function
    };
    // add buttons to inventory
    // list.forEach((i) => { inventory.addCommandBtn(i.name); }) // Loses context of 'this'
    for (let i of list){ inventory.addCommandBtn(i.name); };
  },
};

const game = {
  startRoom: 25,
  firstEnterableRoom: 22,
  room: 25,
  currentFloor: 1,

  init: function () {
    game.setMap(game.currentFloor);
    player.addItems("sword_I", "hp_potion_I", "mp_potion_I");
    game.toggleMapElEventListener();
    game.renderMap();
    player.init();
    inventory.init();
    inventory.menu.invMenuEl.addEventListener("click", inventory.swapInventory);
    document.addEventListener("DOMContentLoaded", game.onPageLoad);
  },

  nextFloor: function () {
    if (game.currentFloor <= 3) {
      game.currentFloor += 1;
      game.setMap(game.currentFloor);
    }
  },

  onPageLoad: function () {
    inventory.menu.skillsBtnEl.click(); // Click skill button
  },

  setMap: function (floorNum) {
    let newMap = data.floors[`f${floorNum}`];
    game.clearMap(); // Clear old map data
    game.map[newMap.bossLocation] = data.icons.boss; // Set boss location
    newMap.encounterRooms.forEach((idx) => { game.map[idx] = data.icons.battle }); // Set guaranteed encounters
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
      !(game.validateMovement(evt.target.id)) // do nothing if move is not valid
    ) return;

    game.room = Number(evt.target.id); // update current room

    // Hide the start square if it is visible
    if (data.elem.startSquare.style.opacity !== 0) data.elem.startSquare.style.opacity = 0;

    game.updateMap();
    game.renderMap();
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

  battleStart(evt) { },
}

// function clearInvBtns(){
//   fetchInvBtnEls();
//   invBtnEls.forEach( (el) => { el.remove(); });
//   fetchInvBtnEls();
// };

// function fetchInvBtnEls(){
//   invBtnEls = document.querySelectorAll('#inventory button'); // global variable
// };

// function swapInventory(evt){
//   const btnNames = ['Skills', 'Items', 'Equipment'];
//   if( !(btnNames.includes(evt.target.textContent)) ) return; // Exit if button is not in the list

//   document.querySelectorAll('.inv-menu-btn').forEach( (el) => { el.classList.remove("highlight-btn") }); // Remove highlight-btn class from all menu items

//   evt.target.classList.add( "highlight-btn" ) // highlight selected button

//   let useList;
//   inventory.loadNewCommandBtns();
//   inventory.commandBtnEls.forEach(el => el.remove());
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
//       console.log(`swapInventory: No case for ${evt.target.textContent}`);
//       return; // leave function
//     };
//   };
//   useList.forEach( (i) => { inventory.addCommandBtn(i.name); })
// };

// function useItems(evt){
//   item = data.allItems[evt.target.textContent]
//   if( !item ) return; // return if selection is NOT an item

//   switch(item.type){
//     case "consumable": {};
//     case "equipment": {
//       // player.
//     };
//   };
// };


// ===== Script =====
game.init();

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
