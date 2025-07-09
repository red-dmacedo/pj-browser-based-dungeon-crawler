export const skills = {
  fire:       { name: "fire",       Multiplier: 1.5, mpCost: 50, helpText: "Highest Atk damage" },
  lightning:  { name: "lightning",  Multiplier: 0.5, mpCost: 20, helpText: "Chance to stun enemy; Deals mid-range damage" },
  nudge:      { name: "nudge",      Multiplier: 0.2, mpCost: 0,  helpText: "Minimum damage" },
  slash_I:    { name: "slash_I",    Multiplier: 1,   mpCost: 0,  helpText: "A slash that will get the job done" },
  slash_II:   { name: "slash_II",   Multiplier: 1.3, mpCost: 0,  helpText: "Lesser slashing technique" },
  slash_III:  { name: "slash_III",  Multiplier: 2,   mpCost: 0,  helpText: "Greater slashing techniques" },
  slash_IV:   { name: "slash_IV",   Multiplier: 3,   mpCost: 0,  helpText: "The pinnacle of slashing techniques" },
  water:      { name: "water",      Multiplier: 0.1, mpCost: 10, helpText: "Low damage; Kill enemies below x% HP" },
};

export const enemies = {
  slime:    { name: "Slime",    type: "🌊", attacks: ["water", "nudge"],    difficultyRating: 1,  killXp: 10, },
  fairy:    { name: "Fairy",    type: "⚡", attacks: ["lightning"],         difficultyRating: 1,  killXp: 30, },
  minotaur: { name: "Minotaur", type: "🪓", attacks: ["tackle", "slash_II"], difficultyRating: 2, killXp: 50, },
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
  f1: {
    name:"1F",
    bossLocation: 19,
    guaranteedEncounters: [9,],
    // map:[
    //   "", "", "", "", "",
    //   "", "", "", "", "⚔️",
    //   "", "", "", "", "",
    //   "", "", "", "", "☠️",
    //   "", "", "", "", ""
    // ]
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

export const player = {
  init: function(){
    this.setPlayerLv(1);
  },
  setPlayerLv: function(lv){
    if( !(this.levels[`lv${lv}`]) ) return; // exit if level is not found
    this.level = lv;
    let newLevel = this.levels[`lv${this.level}`];
    // Xp
    let excessXp = this.maxXp - this.xp;
    this.xp = newLevel.startingXp;
    if ( excessXp > 0 ) this.xp += excessXp;
    this.maxXp = newLevel.maxXp;
    // HP
    this.maxHp = newLevel.maxHp;
    this.hp = this.maxHp;
    // MP
    this.maxMp = newLevel.maxMp;
    this.mp = this.maxMp;
    // new skills
    for(let i=1;i<=lv;i++){ // <= protect against leveling up more than once
      let lvObj = this.levels[`lv${i}`];
      lvObj.newSkills.forEach( skillname => { this.addSkill(skillname) });
    };
    this.removeSkillDuplicates();
    this.sortSkills();
  },
  removeSkillDuplicates: function(){ this.skillList = [...new Set(this.skillList)]; },
  firstLv: 1,
  lastLv: 5,
  level: 1,
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
  levels: {
    lv1: { name: "Lv1", startingXp: 0, maxXp: 100, maxHp: 100, maxMp: 100, newSkills: ["slash_I", "nudge", "water", ], },
    lv2: { name: "Lv2", startingXp: 0, maxXp: 300, maxHp: 120, maxMp: 120, newSkills: ["slash_II", "lightning", ], },
    lv3: { name: "Lv3", startingXp: 0, maxXp: 300, maxHp: 140, maxMp: 140, newSkills: ["fire", ], },
    lv4: { name: "Lv4", startingXp: 0, maxXp: 500, maxHp: 160, maxMp: 160, newSkills: ["slash_III", ], },
    lv5: { name: "Lv5", startingXp: 0, maxXp: 1000, maxHp: 200, maxMp: 200, newSkills: ["slash_IV", ], },
  },
  addSkill: function (name) {
    let skill = skills[name];
    if(skill) this.skillList.push(skill);
  },
  addEquipment: function(name) {
    let e = equipment[name]
    if(e) this.equipment.push(e);
  },
  sortEquipment: function(){
    this.equipment.sort( (a, b) => a.name.localeCompare(b.name) );
  },
  sortItems: function(){
    this.item.sort( (a, b) => a.name.localeCompare(b.name) );
  },
  sortSkills: function(){
    this.skillList.sort( (a, b) => a.name.localeCompare(b.name) );
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
    this.setPlayerLv(this.level+1)
  },
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
};
