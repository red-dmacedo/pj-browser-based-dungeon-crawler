export const skills = {
  fire:       { name: "fire",       Multiplier: 1.5, mpCost: 50, helpText: "1.5x mAtk" },
  lightning:  { name: "lightning",  Multiplier: 0.5, mpCost: 20, helpText: "0.5x mAtk; Chance to stun enemy" },
  nudge:      { name: "nudge",      Multiplier: 0.2, mpCost: 0,  helpText: "0.2x Atk" },
  slash_I:    { name: "slash_I",    Multiplier: 1,   mpCost: 0,  helpText: "1x Atk" },
  slash_II:   { name: "slash_II",   Multiplier: 1.3, mpCost: 0,  helpText: "1.3x Atk" },
  slash_III:  { name: "slash_III",  Multiplier: 2,   mpCost: 0,  helpText: "2x Atk" },
  slash_IV:   { name: "slash_IV",   Multiplier: 3,   mpCost: 0,  helpText: "3x Atk" },
  tackle:     { name: "tackle",     Multiplier: 1.5, mpCost: 0,  helpText: "1.5x Atk" },
  water:      { name: "water",      Multiplier: 0.1, mpCost: 10, helpText: "0.1x mAtk; Kill enemies below 20% HP" },
};

export const enemies = {
  slime:    { name: "slime",    type: "🌊", skillList: ["water", "nudge"],     difficultyRating: 1, killXp: 10, hp: 50, mp: 100, },
  fairy:    { name: "fairy",    type: "⚡", skillList: ["lightning"],          difficultyRating: 1, killXp: 30, hp: 100, mp: 100, },
  minotaur: { name: "minotaur", type: "🪓", skillList: ["tackle", "slash_II"], difficultyRating: 2, killXp: 50, hp: 130, mp: 100, },
};

export const allItems = {
  hp_potion_I: { name: "hp_potion_I", type: "consumable", stat: "hp", value: 50, helpText: "Recover 50% hp", },
  hp_potion_II: { name: "hp_potion_II", type: "consumable", stat: "hp", value: 80, helpText: "Recover 80% hp", },
  hp_potion_III: { name: "hp_potion_III", type: "consumable", stat: "hp", value: 100, helpText: "Recover 100% hp", },
  mp_potion_I: { name: "mp_potion_I", type: "consumable", stat: "mp", value: 50, helpText: "Recover 50% mp", },
  mp_potion_II: { name: "mp_potion_II", type: "consumable", stat: "mp", value: 80, helpText: "Recover 80% mp", },
  mp_potion_III: { name: "mp_potion_III", type: "consumable", stat: "mp", value: 100, helpText: "Recover 100% mp", },
  ruby_amulet: { name: "ruby_amulet", type: "equipment", stat: "matk", value: 40, helpText: "A valuable necklace - +40 matk", },
  sword_I: { name: "sword_I", type: "equipment", stat: "atk", value: 10, helpText: "A rusted sword - +10 atk", },
  sword_II: { name: "sword_II", type: "equipment", stat: "atk", value: 30, helpText: "A decorative sword - +30 atk", },
  sword_III: { name: "sword_III", type: "equipment", stat: "atk", value: 60, helpText: "A masterfully crafted sword - +60 atk", },
  wizard_cap: { name: "wizard_cap", type: "equipment", stat: "matk", value: 20, helpText: "Someone left this lying on the ground - +20 matk", },
};

export const floors = {
  /* this map is kept here as a reference
  map:[
    "0",   "1",  "2",  "3",  "4",
    "5",   "6",  "7",  "8",  "9",
    "10",  "11", "12", "13", "14",
    "15",  "16", "17", "18", "19",
    "20",  "21", "22", "23", "24"
  ]
  */
  f1: {
    name:"1F",
    bossLocation: 19,
    guaranteedEncounters: [9,],
  },
  f2: {
    name:"2F",
    bossLocation: 16,
    guaranteedEncounters: [14,],
  },
  f3: {
    name:"3F",
    bossLocation: 0,
    guaranteedEncounters: [16, 3],
  },
};

export const icons = {
  player: "👣",
  boss: "☠️",
  battle: "⚔️",
  healing: "❤️",
  treasure: "💰",
  mp: "🔵",
  hp: "🟥",
};

// const playerObj = player;
export const player = {
  firstLv: 1,
  lastLv: 5,
  lv: 1,
  baseAtk: 100,
  hp: 100,
  mp: 100,
  xp: 0,
  maxHp: 10,
  maxMp: 10,
  maxXp: 10,
  icon: icons.player,
  equipment: [],
  skillList: [],
  items: [],
  parent: this,

  levels: {
    lv1: { name: "Lv1", startingXp: 0, maxXp: 100, maxHp: 100, maxMp: 100, newSkills: ["slash_I", "nudge", "water", ], },
    lv2: { name: "Lv2", startingXp: 0, maxXp: 300, maxHp: 120, maxMp: 120, newSkills: ["slash_II", "lightning", ], },
    lv3: { name: "Lv3", startingXp: 0, maxXp: 300, maxHp: 140, maxMp: 140, newSkills: ["fire", ], },
    lv4: { name: "Lv4", startingXp: 0, maxXp: 500, maxHp: 160, maxMp: 160, newSkills: ["slash_III", ], },
    lv5: { name: "Lv5", startingXp: 0, maxXp: 1000, maxHp: 200, maxMp: 200, newSkills: ["slash_IV", ], },
  },

  playerEls: {
    hpEl: document.querySelector('#player-hp'),
    mpEl: document.querySelector('#player-mp'),
    xpEl: document.querySelector('#player-xp'),
    lvEl: document.querySelector('#player-lv'),
  },

  displayHp: function(){ this.playerEls.hpEl.textContent = `${this.hp}/${this.maxHp}`; },
  displayMp: function(){ this.playerEls.mpEl.textContent = `${this.mp}/${this.maxMp}`; },
  displayXp: function(){ this.playerEls.xpEl.textContent = `${this.xp}/${this.maxXp}`; },
  displayLv: function(){ this.playerEls.lvEl.textContent = this.lv; },
  displayStats: function(){
    this.displayHp();
    this.displayMp();
    this.displayXp();
    this.displayLv();
  },

  init: function(){
    this.setLv(1);
  },

  setLv: function(num){
    if ( num > 5 ) num = 5; // fix outrageous numbers
    if ( num < 1 ) num = 1; // fix outrageous numbers
    if( !(this.levels[`lv${num}`]) ) return; // exit if level is not found
    this.lv = num;
    let newLevel = this.levels[`lv${this.lv}`];
    this.displayLv();
    // Xp
    this.maxXp = newLevel.maxXp;
    let excessXp = this.xp - this.maxXp;
    ( excessXp > 0 ) ?
      this.setXp(excessXp) :
      this.setXp(newLevel.startingXp);
    // HP
    this.maxHp = newLevel.maxHp;
    this.setHp(this.maxHp);
    // MP
    this.maxMp = newLevel.maxMp;
    this.setMp(this.maxMp);
    // new skills
    for(let i=1;i<=num;i++){ // <= protect against leveling up more than once
      let lvObj = this.levels[`lv${i}`];
      lvObj.newSkills.forEach( skillname => { this.addSkill(skillname) });
    };
    this.removeSkillDuplicates();
    this.sortSkills();
  },

  removeSkillDuplicates: function(){ this.skillList = [...new Set(this.skillList)]; },
  addSkill: function (name) {
    let skill = skills[name];
    if(skill) this.skillList.push(skill);
  },

  addEquipment: function(name) {
    let e = equipment[name]
    if(e) this.equipment.push(e);
  },

  sortArrayByNameProperty: function(arr){
    arr.sort( (a, b) => a.name.localeCompare(b.name) );
  },

  sortEquipment: function(){
    this.sortArrayByNameProperty(this.equipment);
  },

  sortItems: function(){
    this.sortArrayByNameProperty(this.items);
  },

  sortSkills: function(){
    this.sortArrayByNameProperty(this.skillList);
  },

  addItems: function(...names){
    for(let i of names){
      let item = allItems[i];
      (item.type === "consumable") ?
        this.items.push(item) :
        this.equipment.push(item);
    };
  },

  lvUpCheck: function(){
    if (this.xp < this.maxXp) return; // leave if xp is not sufficient
    this.setLv(this.lv+1)
  },

  setHp: function(num) {
    this.hp = num;
    if(this.hp > this.maxHp) this.hp = this.maxHp; // prevent going over the cap
    this.displayHp();
  },

  setMp: function(num) {
    this.mp = num;
    if(this.mp > this.maxMp) this.mp = this.maxMp; // prevent going over the cap
    this.displayMp();
  },

  setXp: function(num) {
    this.xp = num;
    this.lvUpCheck();
    this.displayXp();
  },

  addHp: function(num) {
    this.hp += num;
    if(this.hp > this.maxHp) this.hp = this.maxHp; // prevent going over the cap
    this.displayHp();
  },

  addMp: function(num) {
    this.mp += num;
    if(this.mp > this.maxMp) this.mp = this.maxMp; // prevent going over the cap
    this.displayMp();
  },

  addXp: function(num) {
    this.xp += num; // add xp
    this.lvUpCheck(); // check for level up
    this.displayXp(); // display result to html
  },

  useSkill: function(name){
    let skill = skills[name];
    this.mp = this.mp - skill.mpCost
  },
};

export const enemy = {
  name: "Cpu",
  hp: 0,
  mp: 0,
  maxHp: 10,
  maxMp: 10,
  killXp: 0,
  skillList: [],

  enemyEls: {
    hpEl: document.querySelector('#enemy-hp'),
    mpEl: document.querySelector('#enemy-mp'),
    nameEl: document.querySelector('#enemy-name'),
  },

  displayName: function() { this.enemyEls.nameEl.textContent = this.name.toUpperCase(); },
  displayHp: function() { this.enemyEls.hpEl.textContent = `${this.hp}/${this.maxHp}`; },
  displayMp: function() { this.enemyEls.mpEl.textContent = `${this.mp}/${this.maxMp}`; },
  displayStats: function() {
    this.displayHp();
    this.displayMp();
    this.displayName();
  },

  init: function(){
    this.name = "Cpu";
    this.clearSkillList();
    this.hp = 0;
    this.mp = 0;
  },

  setEnemy: function(name) {
    this.clearSkillList();
    let newEnemy = enemies[name]; // get enemy by name
    this.name = newEnemy.name;
    // hp
    this.maxHp = newEnemy.hp;
    this.hp = this.maxHp;
    // mp
    this.maxMp = newEnemy.mp;
    this.mp = this.maxMp;
    // xp
    this.killXp = newEnemy.killXp;
    this.displayStats();
  },

  useSkill: function(name){
    let skill = skills[name];
    this.mp = this.mp - skill.mpCost
  },

  clearSkillList: function(){ this.skillList.length = 0; },

};

// ===== Elements =====
export const elem = {
  mapEl: document.querySelector("#map"),
  mapSquares: document.querySelectorAll(".sqr"),
  startSquare: document.querySelector(".sqr25"),
};

export const invBtns = {
  skillsBtnEl: document.querySelector('#inv-skills-btn'),
  itemsBtnEl: document.querySelector('#inv-items-btn'),
  equipmentBtnEl: document.querySelector('#inv-equipment-btn'),
  refresh: function (){
    this.skillsBtnEl = document.querySelector('#inv-skills-btn');
    this.itemsBtnEl = document.querySelector('#inv-items-btn');
    this.equipmentBtnEl = document.querySelector('#inv-equipment-btn');
  },
};

export const battleLog = {
  element: document.querySelector('#battle-log'),
  logItems: document.querySelectorAll('#battle-log p'),

  init: function(){
    this.clear();
  },

  newLogItem: function(pText){
    if( !pText ) { console.log('No text was passed to battleLog.newLogItem') };
    let logItem = document.createElement('p'); // new paragraph tag
    logItem.textContent = pText;
    this.element.appendChild( logItem );
  },

  clear: function(){
    this.logItems.forEach( tag => tag.remove() );
    this.logItems = document.querySelectorAll('#battle-log p');
  },
}
