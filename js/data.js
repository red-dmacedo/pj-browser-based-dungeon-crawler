const allSkills = [
  { name: "fire", Multiplier: 1.5, mpCost: 50, helpText: "1.5x mAtk", },
  { name: "lightning", Multiplier: 0.5, mpCost: 20, helpText: "0.5x mAtk; Chance to stun enemy", },
  { name: "nudge", Multiplier: 0.2, mpCost: 0, helpText: "0.2x Atk", },
  { name: "slash_I", Multiplier: 1, mpCost: 0, helpText: "1x Atk", },
  { name: "slash_II", Multiplier: 1.3, mpCost: 0, helpText: "1.3x Atk", },
  { name: "slash_III", Multiplier: 2, mpCost: 0, helpText: "2x Atk", },
  { name: "slash_IV", Multiplier: 3, mpCost: 0, helpText: "3x Atk", },
  { name: "tackle", Multiplier: 1.5, mpCost: 0, helpText: "1.5x Atk", },
  { name: "water", Multiplier: 0.1, mpCost: 10, helpText: "0.1x mAtk; Kill enemies below 20% HP", },
];

const allEnemies = [
  { name: "slime", type: "🌊", skillList: ["nudge", "water"], difficultyRating: 1, killXp: 10, hp: 20, mp: 100, },
  { name: "goblin", type: "🪓", skillList: ["nudge", "slash_I"], difficultyRating: 1, killXp: 30, hp: 50, mp: 20, },
  { name: "fairy", type: "⚡", skillList: ["nudge", "lightning"], difficultyRating: 1, killXp: 30, hp: 50, mp: 100, },
  { name: "minotaur", type: "🪓", skillList: ["tackle", "slash_I", "slash_II"], difficultyRating: 2, killXp: 50, hp: 130, mp: 100, },
];

const allBossEnemies = [
  { name: "bigSlime", type: "🌊", skillList: ["nudge", "water", "tackle", "lightning"], difficultyRating: 1, killXp: 100, hp: 100, mp: 100, },
  { name: "frenziedMinotaur", type: "🪓", skillList: ["tackle", "slash_I", "slash_II"], difficultyRating: 2, killXp: 50, hp: 130, mp: 100, },
];

const allItems = [
  { name: "HP Potion I", stat: "hp", value: 50, helpText: "Recover 50% hp", },
  { name: "HP Potion II", stat: "hp", value: 80, helpText: "Recover 80% hp", },
  { name: "HP Potion III", stat: "hp", value: 100, helpText: "Recover 100% hp", },
  { name: "MP Potion I", stat: "mp", value: 50, helpText: "Recover 50% mp", },
  { name: "MP Potion II", stat: "mp", value: 80, helpText: "Recover 80% mp", },
  { name: "MP Potion III", stat: "mp", value: 100, helpText: "Recover 100% mp", },
];

const allEquipment = [
  { name: "empty", position: 'any', stat: "", value: 0, helpText: "empty", },
  { name: "Ruby Amulet", position: 'neck', stat: "matk", value: 40, helpText: "A valuable necklace - +40 matk", },
  { name: "Sword I", position: 'handR', stat: "atk", value: 10, helpText: "A rusted sword - +10 atk", },
  { name: "Sword II", position: 'handR', stat: "atk", value: 30, helpText: "A decorative sword - +30 atk", },
  { name: "Sword III", position: 'handR', stat: "atk", value: 60, helpText: "A masterfully crafted sword - +60 atk", },
  { name: "Wizard Cap", position: 'head', stat: "matk", value: 20, helpText: "Someone left this lying on the ground - +20 matk", },
];

const icons = {
  player: "👣",
  boss: "☠️",
  battle: "⚔️",
  healing: "❤️",
  treasure: "💰",
  mp: "🔵",
  hp: "🟥",
};

const map = {
  el: document.querySelector("#map"),
  startSqrEl: document.querySelector(".sqr25"),
  sqrEls: document.querySelectorAll(".sqr"),
  startRoom: 25,
  firstDungeonRoom: 22,
  playerLocation: 25,
  floor: 1,
  rooms: [ '','','','','','','','','','','','','','','','','','','','','','','','','', ],
  disabled: false,

  floors: [
    /* this map is kept here as a reference
      map: [
        "0",   "1",  "2",  "3",  "4",
        "5",   "6",  "7",  "8",  "9",
        "10",  "11", "12", "13", "14",
        "15",  "16", "17", "18", "19",
        "20",  "21", "22", "23", "24"
      ]
    */
    { name: "1F", bossRoom: 19, encounterRooms: [9,], healRooms: [0], treasureRooms: [10, 4, 13], },
    { name: "2F", bossLocation: 16, encounterRooms: [14,], healRooms: [], treasureRooms: [], },
    { name: "3F", bossLocation: 0, encounterRooms: [16, 3], healRooms: [], treasureRooms: [], },
  ],

  init: function(floorNum){
    map.floor = 1;
    map.playerLocation = 25;
    map.clear(); // clear map.rooms
    map.sqrEls.forEach((el) => { map.highlightSquare(el, true) }); // Remove square highlights (reset)
    (floorNum) ? map.setMapFloor(floorNum) : map.setMapFloor(1); // start on a specific floor or floor 1
    map.disabled = false; // clear if set
  },

  clear: function(){
    map.rooms = [ '','','','','','','','','','','','','','','','','','','','','','','','','', ];
  },

  validateMovement: function (idx) {
    if (typeof (idx) !== "number") { idx = Number(idx) };
    if (map.playerLocation === map.startRoom && idx === map.firstDungeonRoom) return true; // first move on the map
    let testValue = map.playerLocation - idx;

    return ( // return true or false
      (testValue === 1 && idx % 5 !== 4) ||   // move right, unless there is a wall there
      (testValue === -1 && idx % 5 !== 0) ||  // move left, unless there is a wall there
      testValue === 5 ||                      // upwards movement | wall detection is unnecessary
      testValue === -5                        // downwards movement | wall detection is unnecessary
    );
  },

  nextFloor: function(){
    if(map.floor === map.floors.length) return;
    map.floor++;
    map.setMapFloor(map.floor);
  },

  setMapFloor: function (floorNum) {
    let newMap = map.floors[floorNum-1];
    map.clear(); // Clear old map data
    map.rooms[newMap.bossRoom] = icons.boss; // Set boss location
    newMap.encounterRooms.forEach((idx) => { map.rooms[idx] = icons.battle }); // Set guaranteed encounters
    newMap.healRooms.forEach((idx) => { map.rooms[idx] = icons.healing }); // Set healing rooms
    newMap.treasureRooms.forEach((idx) => { map.rooms[idx] = icons.treasure }); // Set treasure rooms
  },

  updateRooms: function () { // move player icon
    map.rooms.forEach((rm) => { if(rm === icons.player) {rm = ''; return}; });
    map.rooms[map.playerLocation] = data.icons.player;
  },

  renderMap: function () { // render map.rooms to user
    map.sqrEls.forEach((el, idx) => { el.textContent = map.rooms[idx]; });
    if (map.playerLocation === map.startRoom) return; // prevent highlight when player is in start room
    map.highlightSquare(map.sqrEls[map.playerLocation]); // show where the player has been
  },

  highlightSquare: function (squareEl, disable = false, color = 'beige') { // highlight rooms the player has passed through
    if(!disable && squareEl.hasAttribute('style')) return; // exit if square is already highlighted
    (disable) ? squareEl.removeAttribute("style") : squareEl.style.backgroundColor = color; // remove highlight or set highlight
  },
  
  evtPlayerMove: function (evt) { // <= player movement and map updates
    if (
      !evt.target.classList.contains("sqr") || // Leave if target was not a square on the map
      !(game.validateMovement(evt.target.id)) || // do nothing if move is not valid
      game.encounterActive || // disallow movement during encounters
      player.isDead || // player has died
      player.encounterActive ||
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
};

const player = {
  // HP
  hp: 1,
  maxHp: 10,
  // MP
  mp: 1,
  maxMp: 10,
  // XP
  xp: 5,
  maxXp: 1000,
  // etc
  skills: [],
  items: [],
  equipment: {
    head: {},
    neck: {},
    torso: {},
    handR: {},
    handL: {},
    legs: {},
},

  levels: [
    { lv: 1, name: "Lv1", baseAtk: 50, startingXp: 0, maxXp: 100, maxHp: 100, maxMp: 100, newSkills: ["slash_I", "nudge", "water",], },
    { lv: 2, name: "Lv2", baseAtk: 70, startingXp: 0, maxXp: 200, maxHp: 120, maxMp: 120, newSkills: ["slash_II", "lightning",], },
    { lv: 3, name: "Lv3", baseAtk: 80, startingXp: 0, maxXp: 300, maxHp: 140, maxMp: 140, newSkills: ["fire",], },
    { lv: 4, name: "Lv4", baseAtk: 100, startingXp: 0, maxXp: 500, maxHp: 160, maxMp: 160, newSkills: ["slash_III",], },
    { lv: 5, name: "Lv5", baseAtk: 120, startingXp: 0, maxXp: 1000, maxHp: 200, maxMp: 200, newSkills: ["slash_IV",], },
  ],

  init: function(lv){
    player.initStats(lv);
  },

  initStats: function(lv){
    if(!lv) lv = 1;
    if(lv > player.levels.length) lv = player.levels.length;
    newLv = player.levels[lv-1];
    // HP
    player.maxHp = newLv.maxHp;
    player.hp = player.maxHp;
    // MP
    player.maxMp = newLv.maxMp;
    player.mp = player.maxMp;
    // XP
    player.maxXp = newLv.maxXp;
    player.xp = 0;
    player.lv = newLv.lv;
    newLv.newSkills.forEach((skil) => { skil = allSkills.filter(s => s.name === skil); player.skills.push(skil) });
  },

  clearSkills: function(){
    player.skills.length = 0;
  },

  sortSkills: function(){
    sortArr(player.skills, 'name');
  },

  sortItems: function(){
    sortArr(player.items, 'name');
  },
};

const battleLog = {
  element: document.querySelector('#battle-log'),
  logItems: document.querySelectorAll('#battle-log p'),
  lines: 0,

  init: function () {
    battleLog.clear();
    battleLog.lines = 0;
  },

  newLine: function (pText, color) {
    battleLog.lines++;
    if (!pText) { console.log('No text was passed to battleLog.newLogItem'); return; }; // left in because only changing the code will allow execution
    let logItem = document.createElement('p'); // new paragraph tag
    logItem.textContent = `[${battleLog.lines}] ${pText}`;
    if(battleLog.lines % 2 === 0) logItem.style.color = 'rgba(180,180,180,1)';
    if(color) logItem.style.color = color;
    battleLog.element.prepend(logItem);
    // battleLog.element.appendChild(logItem); // swapped to prepend
  },

  clear: function () {
    battleLog.logItems.forEach(ptag => ptag.remove());
    battleLog.logItems = document.querySelectorAll('#battle-log p');
  },
};
/* ===== Functions ===== */
function rollNum(start, end) {
  return Math.floor(Math.random() * (end-start+1)) + start;
};

function sortArr(arr, prop){
  let propType;
  // switch(typeof(arr[0].property));
  if(prop){
    propType = typeof(arr[0].prop)
    switch(propType){
      case "string":
        arr.sort((a, b) => a.prop.localeCompare(b.prop) );
        break;
      case "number":
        arr.sort((a, b) => a - b );
        break;
      default:
        console.log(`Cannot sort property type: ${propType}`);
    };
  };

  propType = typeof(arr[0]);
  switch(propType){
      case "string":
        arr.sort((a, b) => a.localeCompare(b) );
        break;
      case "number":
        arr.sort((a, b) => a - b );
        break;
      default:
        console.log(`Cannot sort property type: ${propType}`);
  };
};

export {
  allSkills,
  allEnemies,
  allItems,
  allBossEnemies,
  icons,
  map,
  battleLog,
  rollNum,
}

/* ===== Graveyard =====

===== Object Behavior when using the object name vs 'this' keyword =====
export const tempObj = {
  prop1: 'one',
  init: function () {
    tempObj.prop1 = 'three';
    tempObj.method1();
  },
  method1: function (){
    console.dir(tempObj);
  },
  method2: () => { // working
    tempObj.method1();
  },
  method3: function() { // working
    console.log('prop1:', tempObj.prop1);
    tempObj.method1();
  },
};
export const tempObj2 = {
  prop1: 'one',
  init: function () {
    this.prop1 = 'three';
    this.method1();
  },
  method1: function (){
    console.dir(this);
  },
  method2: () => { // Error message: Uncaught TypeError: Cannot read properties of undefined (reading 'method1')
    this.method1();
  },
  method3: function() { // working
    console.log('prop1:', this.prop1);
    this.method1();
  },
};


  ===== player.setLv =====
  // replaced for modularity: player.stats.lvUp(), player.stats.lvUpCheck(), player.setFirstLv(), player.setLv()
  setLv: function (num) {
    let stats = player.stats;
    if (num > stats.maxLv) num = stats.maxLv; // fix outrageous numbers
    if (num < 1) num = 1; // fix outrageous numbers

    let newLevel = player.levels[`lv${num}`];
    if (!newLevel) return; // exit if level is not found

    let skills = player.inventory.skills;

    stats.lv = num;
    // Xp
    stats.maxXp = newLevel.maxXp;
    let excessXp = stats.xp - stats.maxXp;
    (excessXp > 0) ?
      stats.xp = excessXp :
      stats.xp = newLevel.startingXp;
    // HP
    stats.maxHp = newLevel.maxHp;
    stats.hp = stats.maxHp;
    // MP
    stats.maxMp = newLevel.maxMp;
    stats.mp = stats.maxMp;
    // new skills
    for (let i = 1; i <= stats.lv; i++) { // <= add skills from previous levels
      let lvObj = player.levels[`lv${i}`];
      lvObj.newSkills.forEach(skillname => { skills.add(skillname) });
    };
    skills.removeDuplicates();
    skills.sort();
    stats.update();
  },

===== old player object =====
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
  icon: icons.player,
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
    player.playerEls.hpEl.textContent = `${player.hp}/${player.maxHp}`;
  },

  displayMp: function () {
    player.playerEls.mpEl.textContent = `${player.mp}/${player.maxMp}`;
  },

  displayXp: function () {
    player.playerEls.xpEl.textContent = `${player.xp}/${player.maxXp}`;
  },

  displayLv: function () {
    player.playerEls.lvEl.textContent = player.lv;
  },

  displayStats: function () {
    player.displayHp();
    player.displayMp();
    player.displayXp();
    player.displayLv();
  },

  init: function (lv = 1) {
    player.setLv(lv);
    player.addStartingItems();
  },

  setLv: function (num) {
    if (num > 5) num = 5; // fix outrageous numbers
    if (num < 1) num = 1; // fix outrageous numbers
    if (!(player.levels[`lv${num}`])) return; // exit if level is not found
    player.lv = num;
    let newLevel = player.levels[`lv${player.lv}`];
    player.displayLv();
    // Xp
    player.maxXp = newLevel.maxXp;
    let excessXp = player.xp - player.maxXp;
    (excessXp > 0) ?
      player.setXp(excessXp) :
      player.setXp(newLevel.startingXp);
    // HP
    player.maxHp = newLevel.maxHp;
    player.setHp(player.maxHp);
    // MP
    player.maxMp = newLevel.maxMp;
    player.setMp(player.maxMp);
    // new skills
    for (let i = 1; i <= num; i++) { // <= add skills from previous levels
      let lvObj = player.levels[`lv${i}`];
      lvObj.newSkills.forEach(skillname => { player.addSkill(skillname) });
    };
    player.removeSkillDuplicates();
    player.sortSkills();
  },

  removeSkillDuplicates: function () {
    player.skillList = [...new Set(player.skillList)];
  },

  addSkill: function (name) {
    let skill = skills[name];
    if (skill) player.skillList.push(skill);
  },

  sortArrayByNameProperty: function (arr) {
    arr.sort((a, b) => a.name.localeCompare(b.name));
  },

  sortEquipment: function () {
    player.sortArrayByNameProperty(player.equipment);
  },

  sortItems: function () {
    player.sortArrayByNameProperty(player.items);
  },

  sortSkills: function () {
    player.sortArrayByNameProperty(player.skillList);
  },

  addItems: function (...names) {
    for (let i of names) {
      let item = allItems[i];
      if(!item) console.log(`Invalid item: ${i}`);
      switch (item.type) {
        case "consumable":
          player.items.push(item);
          break;
        case "equipment":
          player.equipment.push(item);
          break;
      };
    };
    player.sortItems();
    player.sortEquipment();
  },

  lvUpCheck: function () {
    if (player.xp < player.maxXp) return; // leave if xp is not sufficient
    player.setLv(player.lv + 1)
  },

  setHp: function (num) {
    player.hp = num;
    if (player.hp > player.maxHp) player.hp = player.maxHp; // prevent going over the cap
    player.displayHp();
  },

  setMp: function (num) {
    player.mp = num;
    if (player.mp > player.maxMp) player.mp = player.maxMp; // prevent going over the cap
    player.displayMp();
  },

  setXp: function (num) {
    player.xp = num;
    player.lvUpCheck();
    player.displayXp();
  },

  addHp: function (num) {
    player.hp += num;
    if (player.hp > player.maxHp) player.hp = player.maxHp; // prevent going over the cap
    player.displayHp();
  },

  addMp: function (num) {
    player.mp += num;
    if (player.mp > player.maxMp) player.mp = player.maxMp; // prevent going over the cap
    player.displayMp();
  },

  addXp: function (num) {
    player.xp += num; // add xp
    player.lvUpCheck(); // check for level up
    player.displayXp(); // display result to html
  },

  useSkill: function (name) {
    let skill = skills[name];
    player.mp = player.mp - skill.mpCost
  },

  addStartingItems: function () {
    player.addItems(
      'sword_I',
      'hp_potion_I',
      'hp_potion_I',
      'hp_potion_I',
      'mp_potion_I',
      'mp_potion_I'
    );
  },
};

===== old inventory object =====
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
    inventory.clearCommandBtns();
    inventory.menu.invMenuEl.addEventListener("click", inventory.swapInventory);
  },

  clearCommandBtns: function () {
    inventory.commandBtnEls.forEach(el => el.remove());
  },

  clearItems: function () {
    player.items.length = 0;
    player.equipment.length = 0;
    player.addStartingItems()
  },

  loadNewCommandBtns: function () {
    inventory.commandBtnEls = document.querySelectorAll('#inventory button')
  },

  addCommandBtn: function (text) {
    let nBtn = document.createElement('button');
    nBtn.type = 'button';
    nBtn.classList.add('inv-btn');
    nBtn.textContent = text;
    inventory.invEl.appendChild(nBtn);
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
    for (let i of list){ inventory.addCommandBtn(i.name); };
  },
};
*/

/* ===== Graveyard 2 ===
const enemy = {
  name: "Cpu",
  hp: 0,
  mp: 0,
  maxHp: 10,
  maxMp: 10,
  killXp: 0,
  skillList: [],
  isDead: false,

  enemyEls: {
    hpEl: document.querySelector('#enemy-hp'),
    mpEl: document.querySelector('#enemy-mp'),
    nameEl: document.querySelector('#enemy-name'),
  },

  displayName: function () { enemy.enemyEls.nameEl.textContent = enemy.name.toUpperCase(); },
  displayHp: function () { enemy.enemyEls.hpEl.textContent = `${enemy.hp}/${enemy.maxHp}`; },
  displayMp: function () { enemy.enemyEls.mpEl.textContent = `${enemy.mp}/${enemy.maxMp}`; },
  displayStats: function () {
    enemy.displayHp();
    enemy.displayMp();
    enemy.displayName();
  },

  init: function () {
    enemy.name = "Cpu";
    enemy.clearSkillList();
    enemy.hp = 0;
    enemy.mp = 0;
    enemy.commandBox.init();
  },

  setEnemy: function (char) {
    enemy.clearSkillList();
    enemy.isDead = false;
    let newEnemy;

    (typeof (char) === 'string') ? newEnemy = allEnemies[char] : newEnemy = char; // get enemy by name or allow object to pass
    if(!newEnemy) newEnemy = bossEnemies[char];
    enemy.name = `${newEnemy.name}${newEnemy.type}`;
    // hp
    enemy.maxHp = newEnemy.hp;
    enemy.hp = enemy.maxHp;
    // mp
    enemy.maxMp = newEnemy.mp;
    enemy.mp = enemy.maxMp;
    // xp
    enemy.killXp = newEnemy.killXp;
    enemy.displayStats();
    // skills
    enemy.skillList = newEnemy.skillList //.forEach((skil) => {enemy.skillList.push(skil)})
    enemy.commandBox.init();
  },

  commandBox: {
    init: function () {
      enemy.commandBox.clear();
      enemy.commandBox.displayList(enemy.skillList);
    },
    el: document.querySelector('#enemy-command-box'),
    addButton: function (text) {
      const cmdEl = enemy.commandBox.el;
      let nBtn = document.createElement('button');
      nBtn.type = 'button';
      nBtn.classList.add('battle-btn');
      nBtn.textContent = text;
      cmdEl.appendChild(nBtn);
    },
    clear() {
      const commandBoxEl = enemy.commandBox.el;
      for (let el of Array.from(commandBoxEl.children)) { el.remove(); }; // convert children object to array for use in loop
    },
    displayList: function (list) {
      if(!list) return;
      if(list.length === 0) return;
      const commandBox = enemy.commandBox;
      commandBox.clear();
      list.forEach(i => commandBox.addButton(i));
    },

  },

  useSkill: function (name) {
    const skill = allSkills[name];
    enemy.mp = enemy.mp - skill.mpCost
  },

  clearSkillList: function () { enemy.skillList.length = 0; },

  addHp: function (num) {
    if (enemy.isDead) {
      battleLog.newLine(`${enemy.name} is already dead. Move on!`);
      return;
    };
    enemy.hp += num;
    enemy.enemyEls.hpEl.textContent = enemy.hp;
    if (enemy.hp <= 0) {
      enemy.isDead = true;
      battleLog.newLine(`${enemy.name.toUpperCase()} has been slain`, 'red');
    };
  },
};
const player = {
  isDead: false,
  encounterActive: false,
  stats: {
    atk: 20,
    icon: icons.player,
    lv: 1,
    maxLv: 5,
    // Hp
    hp: 1,
    maxHp: 10,
    // Mp
    mp: 1,
    maxMp: 10,
    // Xp
    xp: 0,
    maxXp: 10,
    totalXp: 0,
    addHp: function (num) {
      const stats = player.stats;
      stats.hp += num;
      if (stats.hp > stats.maxHp) stats.hp = stats.maxHp;
      if (stats.hp <= 0) {
        player.isDead = true;
        battleLog.newLine('Player has been slain!', 'red');
      };
      stats.updateHp();
    },
    addMp: function (num) {
      const stats = player.stats;
      stats.mp += num;
      if (stats.mp > stats.maxMp) stats.mp = stats.maxMp;
      stats.updateMp();
    },
    addXp: function (num) {
      const stats = player.stats;
      stats.totalXp += num;
      stats.xp += num;
      stats.updateXp();
      stats.lvUpCheck();
    },
    lvUp: function () {
      const stats = player.stats;
      if (stats.xp < stats.maxXp) return; // not enough xp
      (stats.xp > stats.maxXp) ?
        stats.xp = stats.xp - stats.maxXp : // keep excess xp for later lvUp();
        stats.xp = 0;
      const nextLv = player.levels[`lv${stats.lv}`]; // get lv object
      // edit stats
      stats.lv++; // next level
      stats.maxHp = nextLv.maxHp;
      stats.maxMp = nextLv.maxMp;
      stats.maxXp = nextLv.maxXp;
      stats.hp = nextLv.maxHp;
      stats.mp = nextLv.maxMp;
      nextLv.newSkills.forEach((item) => player.inventory.skills.add(item));
      player.inventory.skills.removeDuplicates();
      stats.lvUpCheck(); // go up multiple levels if needed
      stats.update();
    },
    lvUpCheck: function () {
      const stats = player.stats;
      if (stats.xp >= stats.maxXp) { stats.lvUp(); };
    },
    updateHp: function () {
      function changeElColor(el, color) { el.style.color = color; };
      const stats = player.stats;
      const hpEl = player.htmlElements.hpEl;
      hpEl.textContent = `${player.stats.hp}/${player.stats.maxHp}`;
      const statBounds = {
        half: (stats.maxHp * 0.7),
        low: (stats.maxHp * 0.3),
      }
      switch (true) {
        case stats.hp <= statBounds.low:
          changeElColor(hpEl, 'red');
          break;
        case stats.hp <= statBounds.half:
          changeElColor(hpEl, 'orange');
          break;
        case stats.hp > statBounds.half:
          changeElColor(hpEl, 'green');
          break;
      };

    },
    updateMp: function () {
      player.htmlElements.mpEl.textContent = `${player.stats.mp}/${player.stats.maxMp}`;
    },
    updateXp: function () {
      player.htmlElements.xpEl.textContent = `${player.stats.xp}/${player.stats.maxXp}`
    },
    updateLv: function () {
      player.htmlElements.lvEl.textContent = player.stats.lv;
    },
    update: function () {
      const stats = player.stats
      stats.updateHp();
      stats.updateMp();
      stats.updateXp();
      stats.updateLv();
    },
  },

  htmlElements: {
    hpEl: document.querySelector('#player-hp'),
    mpEl: document.querySelector('#player-mp'),
    xpEl: document.querySelector('#player-xp'),
    lvEl: document.querySelector('#player-lv'),
  },

  levels: {
    lv1: { name: "Lv1", baseAtk: 50, startingXp: 0, maxXp: 100, maxHp: 100, maxMp: 100, newSkills: ["slash_I", "nudge", "water",], },
    lv2: { name: "Lv2", baseAtk: 70, startingXp: 0, maxXp: 200, maxHp: 120, maxMp: 120, newSkills: ["slash_II", "lightning",], },
    lv3: { name: "Lv3", baseAtk: 80, startingXp: 0, maxXp: 300, maxHp: 140, maxMp: 140, newSkills: ["fire",], },
    lv4: { name: "Lv4", baseAtk: 100, startingXp: 0, maxXp: 500, maxHp: 160, maxMp: 160, newSkills: ["slash_III",], },
    lv5: { name: "Lv5", baseAtk: 120, startingXp: 0, maxXp: 1000, maxHp: 200, maxMp: 200, newSkills: ["slash_IV",], },
  },

  init: function (enemyObj, lv) {
    player.setFirstLv();
    if (lv) player.setLv(lv);
    player.inventory.init();
    player.battle.display.init();
    player.enemy = enemyObj;
  },

  setLv: function (num) { // Currently only allows adding xp, future updates can change this behavior
    const stats = player.stats;
    if (num > stats.maxLv) num = stats.maxLv; // fix outrageous numbers
    if (num < 1) num = 1; // fix outrageous numbers
    let requiredXp = 0;
    for (let i = 0; i < num - 1; i++) { requiredXp += player.levels[`lv${i + 1}`].maxXp; };
    requiredXp = requiredXp - stats.totalXp;
    stats.atk = player.levels[`lv${num}`].baseAtk;
    stats.addXp(requiredXp);
  },

  setFirstLv: function () { // run in init() as FIRST statement
    const stats = player.stats;
    const cLv = player.levels['lv1'];
    // hp
    stats.maxHp = cLv.maxHp;
    stats.hp = cLv.maxHp;
    // mp
    stats.maxMp = cLv.maxMp;
    stats.mp = cLv.maxMp;
    // xp
    stats.xp = 0;
    stats.maxXp = cLv.maxXp;
    // skills
    player.inventory.skills.updateToCurrentLv();
    stats.update();
  },

  sortArrayByNameProperty: function (arr) {
    arr.sort((a, b) => a.name.localeCompare(b.name));
  },

  removeItemFromArray: function (arr, item) {
    arr = arr.splice(arr.indexOf(item), 1);
  },

  inventory: {
    init: function () {
      const inv = player.inventory; // easy reference
      const menuEls = inv.menu.elements; // easy reference
      inv.addStartingItems(); // add basic items to inventory
      inv.skills.updateToCurrentLv(); // add skills to inventory
      inv.menu.setTab('skills'); // set first tab for inventory
      menuEls.invMenuEl.addEventListener("click", inv.menu.evtChangeTab); // swap inventory tabs
    },

    menu: {
      currentTab: 'skills',
      elements: {
        invMenuEl: document.querySelector('#inv-menu'),
        skillsBtnEl: document.querySelector('#inv-skills-btn'),
        itemsBtnEl: document.querySelector('#inv-items-btn'),
        equipmentBtnEl: document.querySelector('#inv-equipment-btn'),
        commandBtnEls: document.querySelectorAll('#inventory button'),
        invEl: document.querySelector('#inventory'),

        refresh: function () {
          const elements = player.inventory.menu.elements;
          elements.invMenuEl = document.querySelector('#inv-menu');
          elements.skillsBtnEl = document.querySelector('#inv-skills-btn');
          elements.itemsBtnEl = document.querySelector('#inv-items-btn');
          elements.equipmentBtnEl = document.querySelector('#inv-equipment-btn');
          elements.commandBtnEls = document.querySelectorAll('#inventory button');
          elements.invEl = document.querySelector('#inventory');
        },
      },
      highlightBtn: function (btn) {
        const menuEls = player.inventory.menu.elements;
        const cssHighlightClass = 'highlight-btn';
        for (let el of [menuEls.skillsBtnEl, menuEls.itemsBtnEl, menuEls.equipmentBtnEl]) {
          if (el.classList.contains(cssHighlightClass)) { el.classList.remove(cssHighlightClass) };
        };
        btn.classList.add(cssHighlightClass);
      },

      clearCommandBtns: function () {
        const menu = player.inventory.menu;
        menu.elements.refresh();
        menu.elements.commandBtnEls.forEach(el => el.remove());
      },

      addCommandButton: function (text) {
        const el = player.inventory.menu.elements.invEl;
        let nBtn = document.createElement('button');
        nBtn.type = 'button';
        nBtn.classList.add('inv-btn');
        nBtn.textContent = text;
        nBtn.addEventListener("click", player.inventory.menu.evtCommandBtnHandler);
        let btnItem = allItems[text];
        if(!btnItem) btnItem = allSkills[text];
        if(btnItem) nBtn.title = btnItem.helpText;
        el.appendChild(nBtn);
        player.inventory.menu.elements.refresh();
      },

      evtCommandBtnHandler: function (evt) {
        if(player.isDead) return;
        const item = allItems[evt.target.textContent];
        if (!item) return; // item not found
        switch (item.type) {
          case "consumable":
            player.inventory.items.use(item)
            break;
          case "equipment":
            // player.inventory.equipment.equip(item); // must implement
            break;
          default:
            console.log("[player.inventory.menu.elements.evtCommandBtnHandler()] No case for item.type:", item.type); // left in because only changing the code will allow execution
            return; // exit if item was not found
        };
      },

      setTab: function (tabName) {
        // list of tabNames (lowercase required): ['skills','items','equipment']
        function containsCapitals(text) {
          for (let letter of Array.from(text)) { if ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(letter)) { return true; }; };
          return false;
        };

        if (containsCapitals(tabName)) { tabName = tabName.toLowerCase(); };
        let list
        let menu = player.inventory.menu;
        menu.elements.refresh(); // refresh commandBtnEls
        menu.clearCommandBtns(); // clear commandBtns to make way for new ones

        switch (tabName) {
          case 'skills':
            list = player.inventory.skills.list;
            menu.highlightBtn(menu.elements.skillsBtnEl);
            break;
          case 'items':
            list = player.inventory.items.list;
            menu.highlightBtn(menu.elements.itemsBtnEl);
            break;
          case 'equipment':
            list = player.inventory.equipment.list;
            menu.highlightBtn(menu.elements.equipmentBtnEl);
            break;
          default:
            console.log('[player.inventory.menu.setTab()] No case for:', tabName); // left in because only changing the code will allow execution
            return;
        };
        menu.currentTab = tabName;
        list.forEach(item => {
          menu.addCommandButton(item.name);
        });
      },

      evtChangeTab: function (evt) {
        if (
          !(evt.target.classList.contains('inv-menu-btn')) ||
          player.encounterActive
        ) return; // only allow class of 'inv-menu-btn'
        player.inventory.menu.setTab(evt.target.textContent.toLowerCase());
      },

      // setTab: function(){},
    },

    equipment: {
      list: [],
      clear: function () {
        player.inventory.equipment.list.length = 0;
      },
      add: function (...items) {
        for (let item of items) {
          if (!(item.name)) item = allItems[item]; // allow item to be an object or name
          if (!item) continue; // skip item if the name was not found
          switch (item.type) {
            case 'equipment': {
              player.inventory.equipment.list.push(item);
              break;
            };
            case 'consumable': {
              player.inventory.items.list.push(item);
              break;
            };
            default: {
              console.log("[player.inventory.items.add()] No case for item.type:", item.type); // left in because only changing the code will allow execution
              continue;
            };
          };
        };
      },
    },

    items: {
      list: [],
      add: function (...items) {
        for (let item of items) {
          if (!(item.name)) item = allItems[item]; // allow item to be an object or name
          if (!item) continue; // skip item if the name was not found
          switch (item.type) {
            case 'equipment': {
              player.inventory.equipment.list.push(item);
              break;
            };
            case 'consumable': {
              player.inventory.items.list.push(item);
              break;
            };
            default: {
              console.log("[player.inventory.items.add()] No case for item.type:", item.type); // left in because only changing the code will allow execution
              continue;
            };
          };
        };
      },
      remove: function (item) {
        if (!(item.name)) item = allItems[item]; // allow item to be object or name
        player.removeItemFromArray(player.inventory.items.list, item);
      },
      sort: function () {
        player.sortArrayByNameProperty(player.inventory.items.list);
      },
      use: function (item) {
        if (!(item.name)) item = allItems[item]; // allow item to be object or name
        if (item.type !== "consumable") return; // only consumables can be used
        switch (item.stat) {
          case "hp":
            player.stats.addHp(item.value);
            battleLog.newLine(`player has recovered ${item.value} HP.`);
            break;
          case "mp":
            player.stats.addMp(item.value);
            battleLog.newLine(`player has recovered ${item.value} MP.`);
            break;
          default:
            console.log(`[player.inventory.items.use()]no case statement for item stat: ${item.stat}`); // left in because only changing the code will allow execution
        };
        player.inventory.items.remove(item);
        player.inventory.menu.setTab(player.inventory.menu.currentTab);
      },
      clear: function () {
        player.inventory.items.list.length = 0;
      },
    },

    skills: {
      list: [],
      updateToCurrentLv: function () {
        const skills = player.inventory.skills;
        skills.list.length = 0;
        for (let i = 0; i < player.stats.lv; i++) {
          let lvObj = player.levels[`lv${i + 1}`];
          lvObj.newSkills.forEach(skil => skills.add(skil));
        };
      },
      add: function (skil) {
        const skills = player.inventory.skills;
        if (!(skil.name)) skil = allSkills[skil];
        skills.list.push(skil);
        skills.removeDuplicates();
      },
      remove: function (skill) {
        if (!(skill.name)) skill = allSkills[skill];
        player.removeItemFromArray(player.inventory.skills.list, skill);
      },
      removeDuplicates: function () {
        player.inventory.skills.list = [...new Set(player.inventory.skills.list)];
      },
      sort: function () {
        player.sortArrayByNameProperty(player.inventory.skills.list);
      },
      use: function (skill) {
        const enemy = player.enemy;
        const stats = player.stats;
        if (!(skill.name)) skill = allSkills[skill]; // allow skill name or object to be passed in
        battleLog.newLine(`Player used ${skill.name}`);
        if(skill.mpCost){battleLog.newLine(` Player lost (${skill.mpCost}) MP`)};
        let hitDmg = -(Math.floor(skill.Multiplier * player.stats.atk));
        battleLog.newLine(`${enemy.name.toUpperCase()} took (${hitDmg}) damage.`);
        enemy.addHp(hitDmg);
        stats.addMp(-(skill.mpCost));
        stats.update();
      },
      clear: function () {
        player.inventory.skills.list.length = 0;
      },
    },

    clear: function () {
      player.inventory.items.clear();
      player.inventory.skills.clear();
      player.inventory.equipment.clear();
    },

    addStartingItems: function () {
      player.inventory.items.add(
        'sword_I',
        'hp_potion_I',
        'hp_potion_I',
        'hp_potion_I',
        'mp_potion_I',
        'mp_potion_I'
      );
    },

  },

  battle: {
    display: {
      init: function () {
        const display = player.battle.display;
        display.commandBox.clear();
        display.commandBox.addStartCommands();
        display.commandBox.el.addEventListener("click", display.commandBox.evtHandleCommand);
      },
      commandBox: {
        el: document.querySelector('#player-command-box'),
        currentList: 'startItems',
        startItems: ['Fight', 'Items', 'Run'],
        addButton: function (text) {
          const cmdEl = player.battle.display.commandBox.el;
          let nBtn = document.createElement('button');
          nBtn.type = 'button';
          nBtn.classList.add('battle-btn');
          nBtn.textContent = text;
          let btnItem = allItems[text];
          if(!btnItem) btnItem = allSkills[text];
          if(btnItem) nBtn.title = btnItem.helpText;
          cmdEl.appendChild(nBtn);
        },
        clear() {
          const commandBoxEl = player.battle.display.commandBox.el;
          for (let el of Array.from(commandBoxEl.children)) { el.remove(); }; // convert children object to array for use in loop
        },
        displayList: function (list) {
          const commandBox = player.battle.display.commandBox;
          commandBox.clear();
          list.forEach(i => commandBox.addButton(i));
          commandBox.addButton('Return'); // do not add to startItems
        },
        addStartCommands: function () {
          const commandBox = player.battle.display.commandBox;
          commandBox.displayList(commandBox.startItems);
        },
        evtHandleCommand: function (evt) {
          // if(!player.encounterActive){
          //   battleLog.newLine('No enemy to fight.')
          //   return;
          // };
          const commandBox = player.battle.display.commandBox;
          const inventory = player.inventory;
          if ([...commandBox.startItems, 'Return'].includes(evt.target.textContent)) {
            switch (evt.target.textContent) {
              case 'Fight':
                commandBox.currentList = 'skills';
                commandBox.displayList(player.inventory.skills.list.map(i => i.name));
                break;
              case 'Items':
                commandBox.currentList = 'items';
                commandBox.displayList(player.inventory.items.list.map(i => i.name));
                break;
              case 'Run':
                // add run attempt logic
                break;
              case 'Return':
                commandBox.currentList = 'startItems';
                commandBox.addStartCommands();
                break;
            };
          };
          // use skill
          let skill = player.filterArrayByName(inventory.skills.list, evt.target.textContent)[0]
          if (skill) {
            inventory.skills.use(skill);
            if(player.enemy.isDead){ player.encounterActive = false };
            commandBox.currentList = 'startItems';
            commandBox.addStartCommands();
          };
          // use item
          let item = player.filterArrayByName(inventory.items.list, evt.target.textContent)[0]
          if (item) {
            inventory.items.use(item);
            commandBox.currentList = 'startItems';
            commandBox.addStartCommands();
          };
        },
      },
    },
    takeAttack: function (enemyAtk, skill) {
      if (typeof (skill) === "string") skill = allSkills[skill];
      const hitDmg = (enemyAtk * skill.Multiplier);
      player.stats.addHp(-hitDmg);
      battleLog.newLine(`player takes (${hitDmg}) damage`);
    },
  },
  filterArrayByName: function (arr, name) {
    return arr.filter(i => i.name === name);
  },
};
*/

// Final Line