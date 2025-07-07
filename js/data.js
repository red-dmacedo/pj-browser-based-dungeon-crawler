export const attacks = {
  fairyLightning: {
    name:"fairyLightning",
    atk:15,
    mp:20,
    helpText:"Cannot stun; Deals mid-range damage"
  },
  fire: {
    name:"Fire",
    atk:70,
    mp:50,
    helpText:"Highest Atk damage"
  },
  hyperSlash: {
    name:"Hyper Slash",
    atk:60,
    mp:0,
    helpText:"The pinnacle of slashing techniques"
  },
  lightning: {
    name:"Lightning",
    atk:15,
    mp:20,
    helpText:"Chance to stun enemy; Deals mid-range damage"
  },
  nudge: {
    name:"Nudge",
    atk:5,
    mp:0,
    helpText:"Minimum damage"
  },
  slash: {
    name:"Slash",
    atk:30,
    mp:0,
    helpText:"A slash that will get the job done"
  },
  strongSlash: {
    name:"Strong Slash",
    atk:60,
    mp:0,
    helpText:"A dangerous swing with a lot of power"
  },
  water: {
    name:"Water",
    atk:10,
    mp:10,
    helpText:"Low damage; Kills enemies below x% HP"
  },
};

export const playerLevels = {
  lv1: {
    name: "Lv1",
    startingXp: 0,
    maxXp: 100,
    playerHp: 100,
    playerMp: 100,
  },
  lv2: {
    name: "Lv2",
    startingXp: 0,
    maxXp: 300,
    playerHp: 120,
    playerMp: 120,
  },
  lv3: {
    name: "Lv3",
    startingXp: 0,
    maxXp: 300,
    playerHp: 140,
    playerMp: 140,
  },
  lv4: {
    name: "Lv4",
    startingXp: 0,
    maxXp: 500,
    playerHp: 160,
    playerMp: 160,
  },
  lv5: {
    name: "Lv5",
    startingXp: 0,
    maxXp: 1000,
    playerHp: 200,
    playerMp: 200,
  },
};

export const enemies = {
  slime: {
    name: "Slime", 
    type: "🌊", 
    attacks: ["water", "nudge"],
    difficultyRating: 1,
    killXp: 10,
  },
  fairy: {
    name: "Fairy",
    type: "⚡",
    attacks: ["fairyLightning"],
    difficultyRating: 1,
    killXp: 30,
  },
  minotaur: {
    name: "Minotaur",
    type: "🪓",
    attacks: ["tackle", "slash"],
    difficultyRating: 2,
    killXp: 50,
  },
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

// ===== Elements =====
export const elem = {
  mapEl: document.querySelector("#map"),
  mapSquares: document.querySelectorAll(".sqr"),
}