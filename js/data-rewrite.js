// ===== Classes =====
class Skill {
  constructor(name, multiplier, mpCost, helpText, statusEffectObj) {
    this.name = name || 'none';
    this.multiplier = multiplier || 1;
    this.mpCost = mpCost || 0;
    this.helpText = helpText || 'none';
    this.statusEffect = statusEffectObj || new StatusEffect;
  }

  static fromObject = (obj) => {
    if (typeof obj !== 'object') throw new Error(`Not an object: ${obj}`);
    let name, multiplier, mpCost, helpText, statusEffect;
    name = obj.name || 'none';
    multiplier = obj.multiplier || 1;
    mpCost = obj.mpCost || 0;
    helpText = obj.helpText || 'none';
    statusEffect = obj.statusEffect || new StatusEffect;
    return new Skill(name, multiplier, mpCost, helpText, statusEffect);
  }

  // set / get name
  set name(name) {
    if (typeof name !== 'string') throw new Error(`name must be a string value: ${name}`);
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set multiplier(value) {
    if (typeof value !== 'number') throw new Error(`multiplier must be a number or decimal: ${value}`);
    this._multiplier = value;
  }

  get multiplier() {
    return this._multiplier;
  }

  set mpCost(value) {
    if (typeof value !== 'number') throw new Error(`multiplier must be a number or decimal: ${value}`);
    this._mpCost = value;
  }

  get mpCost() {
    return this._mpCost;
  }

  set helpText(text) {
    if (typeof text !== 'string') throw new Error(`name must be a string value: ${text}`);
    this._helpText = text;
  }

  get helpText() {
    return this._helpText;
  }

  set statusEffect(statusEffectObj) {
    if (!(statusEffectObj instanceof StatusEffect)) throw new Error(`Not a StatusEffect: ${statusEffectObj}`);
    this._statusEffect = statusEffectObj;
  }

  get statusEffect() {
    return this._statusEffect;
  }

};

class Item {
  // { name: "HP Potion I", stat: "hp", value: 50, helpText: "+50% hp", },
  constructor(name, stat, value, helpText) {
    this.name = name || 'none';
    this.stat = stat || 'hp';
    this.value = value || 0;
    this.helpText = helpText || 'none';
  }

  static fromObject = (obj) => {
    let name, stat, value, helpText;
    name = obj.name || 'none';
    stat = obj.stat || 'hp';
    value = obj.value || 0;
    helpText = obj.helpText || 'none';
    return new Item(name, stat, value, helpText);
  }

  // set / get name
  set name(name) {
    if (typeof name !== 'string') throw new Error(`name must be a string value: ${name}`);
    this._name = name;
  }

  get name() {
    return this._name;
  }

  // set / get stat
  set stat(stat) {
    stat = stat.toLowerCase();
    if (stat !== 'hp' && stat !== 'mp') throw new Error(`stat must be 'hp' or 'mp': ${stat}`);
    this._stat = stat;
  }

  get stat() {
    return this._stat;
  }

  // set / get stat
  set value(value) {
    if (typeof value !== 'number') throw new Error(`value must be a number: ${value}`);
    this._value = value;
  }

  get value() {
    return this._value;
  }

  set helpText(text) {
    if (typeof text !== 'string') throw new Error(`name must be a string value: ${text}`);
    this._helpText = text;
  }

  get helpText() {
    return this._helpText;
  }
};

class StatusEffect {
  constructor(type, duration, description) {
    //    stun: cannot move,    dot: damage over time
    // effect types: stun, dot, regenHp, regenMp
    this.type = type || 'none';
    this.duration = duration || 0;
    this.description = description || 'none';
  }

  static fromObject = (obj) => {
    if (typeof obj !== 'object') throw new Error(`An object must contain the properties of type, duration, description: ${obj}`);
    let type, duration, description;
    type = obj.type || 'none'; // Default value if type is not defined
    duration = obj.duration || 0;
    description = obj.description || 'none';
    return new StatusEffect(type, duration, description);
  }

  set type(value) {
    if (typeof value !== 'string') throw new Error(`type must be a string value: ${value}`);
    this._type = value;
  }

  set duration(value) {
    if (typeof value !== 'number') throw new Error(`duration must be a number: ${value}`);
    this._duration = value;
  }

  set description(value) {
    if (typeof value !== 'string') throw new Error(`description must be a string value: ${value}`);
    this._description = value;
  }
};

class CharacterStatPoints {
  constructor(maxValue) {
    this.value = maxValue || 10;
    this.maxValue = maxValue || 10;
  }

  // Methods
  add = (value) => {
    if (typeof value !== 'number') throw new Error(`Cannot add: ${value}`);
    this.value += value;
    if (this.value > this.maxValue) this.value = this.maxValue;
  }

  subtract = (value) => {
    if (typeof value !== 'number') throw new Error(`Cannot add: ${value}`);
    this.value -= value;
  }

  setValueAndMaxValue = (value) => {
    this.value = value;
    this.maxValue = value;
  }

  // value setters / getters
  set value(value) {
    if (typeof value !== 'number') throw new Error(`Value should be a number: ${value}`);
    this._value = value;
  }

  get value() {
    return this._value;
  }

  // maxValue setters / getters
  set maxValue(value) {
    if (typeof value !== 'number') throw new Error(`maxValue should be a number: ${value}`);
    this._maxValue = value;
  }

  get maxValue() {
    return this._maxValue;
  }

  // setters / getters without strictly defined properties
  get displayText() {
    return `${this.value}/${this.maxValue}`;
  }
};

class CharacterXp extends CharacterStatPoints {
  constructor(maxValue) {
    this.value = 0;
    this.maxValue = maxValue || 10;
  }

  add = (value) => {
    if (typeof value !== 'number') throw new Error(`Cannot add: ${value}`);
    this.value += value;
  }

  canLvUp = () => {
    return this.value >= this.maxValue;
  }
};

class CharacterStatus {
  constructor(list) {
    this.list = list || [];
  };

  // set / get list of status effects
  set list(list) {
    if (typeof list !== 'array') throw new Error(`list must be an array: ${list}`);
    this._list = list;
  };

  get list() {
    return this._list;
  }

  // methods
  add = (statusEffect) => {
    if (!(statusEffect instanceof StatusEffect)) throw new Error(`Not a StatusEffect: ${statusEffect}`);
    this.list.push(statusEffect);
  };

  clear = () => {
    this.list.length = 0;
  };

};

class CharacterSkills {
  constructor(list) {
    this.list = list || [];
  };

  // set / get list of skills
  set list(list) {
    if (typeof list !== 'array') throw new Error(`list must be an array: ${list}`);
    list.forEach((item) => { if (!(item instanceof Skill)) { throw new Error(`Object is not a Skill: ${item}`); } });
    this._list = list;
  };

  get list() {
    return this._list;
  }

  // Methods
  push = (item) => {
    if (!(item instanceof Skill)) throw new Error(`Item was not a skill: ${item}`);
    this.list.push(item);
    this.removeDuplicates();
  }

  sort = () => {
    this.list.sort((a, b) => a.name.localeCompare(b.name));
  };

  clear = () => {
    this.list.length = 0;
  };

  removeDuplicates = () => {
    this.list = [...new Set(this.list)];
  };
};

class CharacterItems {
  constructor() {
    this.list = list || [];
  }

  // set / get list of items
  set list(list) {
    if (typeof list !== 'array') throw new Error(`list must be an array: ${list}`);
    list.forEach((item) => { if (!(item instanceof Skill)) { throw new Error(`Object is not a Skill: ${item}`); } });
    this._list = list;
  };

  get list() {
    return this._list;
  }

  // Methods
  push = (item) => {
    if (!(item instanceof Skill)) throw new Error(`Item was not a skill: ${item}`);
    this.list.push(item);
  }

  remove = (item) => {
    const list = this.list;
    if (typeof item === 'string') item = list.filter(el => el.name === item)[0];
    if (!item) { throw new Error(`Item not found: ${item}`) };
    list.splice(list.indexOf(item), 1);
    this.sort();
  }

  sort = () => {
    this.list.sort((a, b) => a.name.localeCompare(b.name));
  };

  clear = () => {
    this.list.length = 0;
  };

  reduceList = () => {
    return this.list.reduce((accu, val) => {
      if (!accu[val]) accu[val] = 0;
      accu[val]++;
      return accu;
    }, {});
  }
}

class EnemyCharacter {
  constructor(name, cls, type, skillList, difficultyRating, killXp, maxHp, maxMp) {
    this.name = name || 'none';
    this.class = cls || 'normal'; // normal, boss, or elite
    this.type = type || 'none';
    this.difficultyRating = difficultyRating || -1; // default to -1 (no rating)
    this.killXp = killXp || 0;
    this.skills = new CharacterSkills(skillList);
    this.hp = (maxHp) ? new CharacterStatPoints(maxHp) : new CharacterStatPoints(50);
    this.mp = (maxMp) ? new CharacterStatPoints(maxMp) : new CharacterStatPoints(50);
    this.status = new CharacterStatus;
  }

  fromObject = (obj) => {
    let name, cls, type, skillList, difficultyRating, killXp, maxHp, maxMp;
    name = obj.name || 'none';
    cls = obj.cls || 'normal'; // normal, boss, or elite
    type = obj.type || 'none';
    difficultyRating = obj.difficultyRating || -1; // default to -1 (no rating)
    killXp = obj.killXp || 0;
    skillList = obj.skillList || [];
    maxHp = obj.maxHp || 50; // new CharacterStatPoints(maxHp);
    maxMp = obj.maxMp || 50; // new CharacterStatPoints(maxMp);
    return new EnemyCharacter(name, cls, type, skillList, difficultyRating, killXp, maxHp, maxMp);
  }

  set name(name) {
    if (typeof name !== 'string') throw new Error(`name must be a string: ${name}`);
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set class(cls) {
    const acceptedValues = ['normal', 'boss', 'elite'];
    if (!acceptedValues.includes(cls)) throw new Error(`Class must be 'normal', 'boss', or 'elite': ${cls}`);
    this._class = cls;
  }

  get class() {
    return this._class;
  }

  set type(type) {
    if (typeof type !== 'string') throw new Error(`type must be a string: ${type}`);
    if (type.length !== 1) throw new Error(`type must be a single character icon as a string: ${type}`);
    this._type = type;
  }

  get type() {
    return this._type;
  }

  set difficultyRating(num) {
    if (typeof num !== 'number') throw new Error(`difficultyRating must be a number: ${num}`);
    this._difficultyRating = num;
  }

  get difficultyRating() {
    return this._difficultyRating;
  }

  set killXp(value) {
    if (typeof value !== 'number') throw new Error(`killXp must be a number: ${value}`);
    this._killXp = value;
  }

  get killXp() {
    return this._killXp;
  }

  get displayName() {
    return `${this.name} ${this.type}`;
  }
};

class PlayerCharacter {
  constructor() {
    this.hp = new CharacterStatPoints(50);
    this.mp = new CharacterStatPoints(50);
    this.xp = new CharacterXp(50);
    this.status = new CharacterStatus;
    this.skills = new CharacterSkills;
  }
};

class Map {
  constructor(floorNum, playerLocation) {
    if(!floorNum) floorNum = 1;
    if(!playerLocation) playerLocation = 25;
    this.playerLocation = playerLocation; // start location
    this.dungeonEntrance = 22; // Entrance for a 5x5 board
    this.currentFloor = floorNum;
    this.allFloors = allFloors; // allFloors defined below
    this.floorData = Array(25).fill('');
    // this.allowEvt = true;
    this.#displayEls.mapEl.addEventListener("click", this.evtMapMovement);
    this.startFloor(floorNum);
  };

  set allowEvt(bool){
    if(typeof bool !== 'boolean') throw new Error(`allowEvt must be a boolean value: ${bool}`);
    this.allowEvt = bool;
  };

  get allowEvt(){
    return this.allowEvt;
  };

  clearFloorData = () => {
    this.floorData.fill('');
  };

  startFloor = (floorNum) => {
    if(!(floorNum > 0 && floorNum <= this.allFloors.length)) throw new Error(`Floor number cannot be 0 or larger than ${this.allFloors.length}`);
    const newFloor = this.allFloors[floorNum-1];
    this.floorData[newFloor.bossRoom] = icons.boss;
    newFloor.encounterRooms.forEach(( idx )=>{ this.floorData[idx] = icons.battle }); // Set guranteed encounters
    newFloor.healRooms.forEach((idx)=>{ this.floorData[idx] = icons.healing }); // Set healing rooms
    newFloor.treasureRooms.forEach((idx)=>{ this.floorData[idx] = icons.treasure }); // Set treasure rooms
  };

  // private property that cannot be altered:
  #displayEls = {
    mapEl: document.querySelector("#map"),
    startSquareEl: document.querySelector(".sqr25"),
  };

  // allow retrieval of private property:
  get displayEls() {
    return this.#displayEls;
  };

  set playerLocation(num) {
    // allow full length of 25 (includes startSquare)
    if (num <= this.roomEls.length && num >= 0) { this._playerLocation = num; }
    else { throw new Error(`Location is not on the board: ${num}`); };
  };

  get playerLocation(){
    return this._playerLocation;
  };

  get roomEls() {
    return this.displayEls.mapEl.children;
  };

  updateDisplay = () => {
    const roomEls = this.roomEls;
    Array.from(roomEls).forEach((el, idx) => { el.textContent = this.floorData[idx]; });
  };

  validateMovement = (idx) => {
    if (typeof (idx) !== "number") { idx = Number(idx) };
    if (this.playerLocation === this.roomEls.length && idx === this.dungeonEntrance) return true; // first move on the map
    const testValue = this.playerLocation - idx;

    return ( // return true or false
      (testValue === 1 && idx % 5 !== 4) ||   // move right, unless there is a wall there
      (testValue === -1 && idx % 5 !== 0) ||  // move left, unless there is a wall there
      testValue === 5 ||                      // upwards movement | wall detection is unnecessary
      testValue === -5                        // downwards movement | wall detection is unnecessary
    );
  };

  highlightPlayerLocation = () => {
    this.highlightRoom(this.roomEls[this.playerLocation]);
  };

  highlightRoom = (roomEl, unHighlight = false) => {
    (unHighlight) ?
      roomEl.removeAttribute("style") :
      roomEl.setAttribute("style", "background-color: rgba(255,255,200,0.65);");
      
  };
  
  movePlayer = (sqrNum) => {
    if(typeof sqrNum !== 'number') sqrNum = Number(sqrNum); // force string to number
    this.floorData[this.playerLocation] = ''; // remove old icon
    this.floorData[sqrNum] = icons.player; // set icon in new location
    this.playerLocation = sqrNum; // move player
    this.highlightPlayerLocation();
    this.updateDisplay(); // update player view
  };
  
  evtMapMovement = (evt) => {
    const target = evt.target;
    if(
      !( Array.from(target.classList).includes('sqr') ) || // target must have class of "sqr"
      !( this.validateMovement(target.id) ) // target must be a valid player movement
    ) return;
    this.movePlayer(target.id);
  };
};
// ===== End Classes =====
// ===== Objects and Arrays of Objects =====
const allFloors = [
  { name: "1F", bossRoom: 19, encounterRooms: [9,], healRooms: [0], treasureRooms: [10, 4, 13], },
  { name: "2F", bossLocation: 16, encounterRooms: [14,], healRooms: [], treasureRooms: [], },
  { name: "3F", bossLocation: 0, encounterRooms: [16, 3], healRooms: [], treasureRooms: [], },
  /* this map is kept here as a reference
    map: [
      "0",   "1",  "2",  "3",  "4",
      "5",   "6",  "7",  "8",  "9",
      "10",  "11", "12", "13", "14",
      "15",  "16", "17", "18", "19",
      "20",  "21", "22", "23", "24"
    ]
  */
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

// Status effects:
const allStatusEffects = {
  stun: StatusEffect.fromObject({ type: 'stun', duration: 3, description: 'Turn is skipped' }),
  fireDot: StatusEffect.fromObject({ type: 'dot', duration: 1, description: 'Take 1x fire damage every turn' }), // fire dot (damage over time)
};

// Skills:
const allSkills = [
  Skill.fromObject({ name: 'fire', multiplier: 1.5, mpCost: 50, helpText: '1.5x mAtk;', statusEffect: allStatusEffects.fireDot, }),
  Skill.fromObject({ name: 'lightning', multiplier: 0.5, mpCost: 20, helpText: '0.5x mAtk; Chance to stun enemy', statusEffect: allStatusEffects.stun, }),
  Skill.fromObject({ name: "nudge", Multiplier: 0.2, mpCost: 0, helpText: "0.2x Atk", }),
  Skill.fromObject({ name: "slash_I", Multiplier: 1, mpCost: 0, helpText: "1x Atk", }),
  Skill.fromObject({ name: "slash_II", Multiplier: 1.3, mpCost: 0, helpText: "1.3x Atk", }),
  Skill.fromObject({ name: "slash_III", Multiplier: 2, mpCost: 0, helpText: "2x Atk", }),
  Skill.fromObject({ name: "slash_IV", Multiplier: 3, mpCost: 0, helpText: "3x Atk", }),
  Skill.fromObject({ name: "tackle", Multiplier: 1.5, mpCost: 0, helpText: "1.5x Atk", }),
  Skill.fromObject({ name: "water", Multiplier: 0.1, mpCost: 10, helpText: "0.1x mAtk; Kill enemies below 20% HP", }),
  // Skill.fromObject({ name: "", Multiplier: 0, mpCost: 0, helpText: "", statusEffect: 'Not yet implemented', }), // Copy/Paste for new skills
];

// Items:
const allItems = [
  Item.fromObject({ name: "HP Potion I", stat: "hp", value: 50, helpText: "+50% hp", }),
  Item.fromObject({ name: "HP Potion I", stat: "hp", value: 50, helpText: "+50% hp", }),
  Item.fromObject({ name: "HP Potion II", stat: "hp", value: 80, helpText: "+80% hp", }),
  Item.fromObject({ name: "HP Potion III", stat: "hp", value: 100, helpText: "+100% hp", }),
  Item.fromObject({ name: "MP Potion I", stat: "mp", value: 50, helpText: "+50% mp", }),
  Item.fromObject({ name: "MP Potion II", stat: "mp", value: 80, helpText: "+80% mp", }),
  Item.fromObject({ name: "MP Potion III", stat: "mp", value: 100, helpText: "+100% mp", }),
];


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
    if (battleLog.lines % 2 === 0) logItem.style.color = 'rgba(180,180,180,1)';
    if (color) logItem.style.color = color;
    battleLog.element.prepend(logItem);
    // battleLog.element.appendChild(logItem); // swapped to prepend
  },

  clear: function () {
    battleLog.logItems.forEach(ptag => ptag.remove());
    battleLog.logItems = document.querySelectorAll('#battle-log p');
  },
};
// ===== End Objects and Arrays of Objects =====
// ===== Helper Functions =====
function getSkill(name) {
  return allSkills.filter(el => el.name === name)[0];
};

function getItem(name) {
  return allItems.filter(el => el.name === name)[0];
};

function rollNum(end, start = 0) {
  return Math.floor(Math.random() * (end - start + 1)) + start;
};

function sortArr(arr, prop) {
  let propType, arrowFunc;
  if (prop) { propType = typeof (arr[0][prop]) }
  else { propType = typeof (arr[0]) };

  switch (propType) {
    case 'string':
      if (prop) { arrowFunc = (a, b) => a[prop].localeCompare(b[prop]); }
      else { arrowFunc = (a, b) => a.localeCompare(b) };
      break;
    case 'number':
      if (prop) { arrowFunc = (a, b) => a[prop] - b[prop] }
      else { arrowFunc = (a, b) => a - b; };
      break;
    default:
      console.log(`Cannot sort property type: ${propType}`);
      return;
  };

  arr.sort(arrowFunc);
};

function removeItemFromArray(arr, item) {
  arr.splice(arr.indexOf(item), 1);
};

export {
  EnemyCharacter,
  Item,
  Map,
  PlayerCharacter,
  Skill,
  StatusEffect,
};

const tMap = new Map;
tMap.updateDisplay();