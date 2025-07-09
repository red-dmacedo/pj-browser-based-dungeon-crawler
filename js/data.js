export const skills = {
  fire: { name: "fire", Multiplier: 1.5, mpCost: 50, helpText: "Highest Atk damage" },
  lightning: { name: "lightning", Multiplier: 0.5, mpCost: 20, helpText: "Chance to stun enemy; Deals mid-range damage" },
  nudge: { name: "nudge", Multiplier: 0.2, mpCost: 0, helpText: "Minimum damage" },
  slash_I: { name: "slash_I", Multiplier: 1, mpCost: 0, helpText: "A slash that will get the job done" },
  slash_II: { name: "slash_II", Multiplier: 1.3, mpCost: 0, helpText: "Lesser slashing technique" },
  slash_III: { name: "slash_III", Multiplier: 2, mpCost: 0, helpText: "Greater slashing techniques" },
  slash_IV: { name: "slash_IV", Multiplier: 3, mpCost: 0, helpText: "The pinnacle of slashing techniques" },
  water: { name: "water", Multiplier: 0.1, mpCost: 10, helpText: "Low damage; Kill enemies below x% HP" },
};

export const enemies = {
  slime: { name: "Slime", type: "🌊", attacks: ["water", "nudge"], difficultyRating: 1, killXp: 10, },
  fairy: { name: "Fairy", type: "⚡", attacks: ["lightning"], difficultyRating: 1, killXp: 30, },
  minotaur: { name: "Minotaur", type: "🪓", attacks: ["tackle", "slash_II"], difficultyRating: 2, killXp: 50, },
};

export const floors = {
  f1: {
    name:"1F",
    bossLocation: 20,
    map:[
      "", "", "", "", "",
      "", "", "", "", "⚔️",
      "", "", "", "", "",
      "", "", "", "", "☠️",
      "", "", "", "", ""
    ]
  },
  f2: {
    name:"2F",
    bossLocation: 17,
    map:[
      "", "", "", "", "",
      "", "", "", "", "",
      "" ,"", "", "", "",
      "", "☠️", "", "", "",
      "", "", "", "", ""
    ]
  },
  f3: {
    name:"3F",
    bossLocation: 0,
    map:[
      "☠️", "", "", "", "",
      "", "", "", "", "",
      "", "", "", "", "",
      "", "", "", "", "",
      "", "", "", "", ""
    ]
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
  level: 1,
  baseAtk: 100,
  hp: 100,
  mp: 100,
  xp: 0,
  maxXp: 10,
  maxHp: 10,
  maxMp: 10,
  icon: icons.player,
  equipment: [],
  levels: {
    lv1: { name: "Lv1", startingXp: 0, maxXp: 100, maxHp: 100, maxMp: 100, newSkills: ["slash_I", "nudge", "water", ], },
    lv2: { name: "Lv2", startingXp: 0, maxXp: 300, maxHp: 120, maxMp: 120, newSkills: ["slash_II", "lightning", ], },
    lv3: { name: "Lv3", startingXp: 0, maxXp: 300, maxHp: 140, maxMp: 140, newSkills: ["fire", ], },
    lv4: { name: "Lv4", startingXp: 0, maxXp: 500, maxHp: 160, maxMp: 160, newSkills: ["slash_III", ], },
    lv5: { name: "Lv5", startingXp: 0, maxXp: 1000, maxHp: 200, maxMp: 200, newSkills: ["slash_IV", ], },
  },
  skillList: [],
  addSkill: function (name) {
    let skill = skills[name];
    if(skill) this.skillList.push(skill);
  },
  addEquipment: function(name) {
    let e = equipment[name]
    if(e) this.equipment.push(e);
  },
  sortEquipment: function(){
    this.equipment.sort( a, b => a - b );
  },
};

// ===== Elements =====
export const elem = {
  mapEl: document.querySelector("#map"),
  mapSquares: document.querySelectorAll(".sqr"),
  startSquare: document.querySelector(".sqr25"),
};
