const allSkills = {
  fire: { name: "fire", Multiplier: 1.5, mpCost: 50, helpText: "1.5x mAtk", },
  lightning: { name: "lightning", Multiplier: 0.5, mpCost: 20, helpText: "0.5x mAtk; Chance to stun enemy", },
  nudge: { name: "nudge", Multiplier: 0.2, mpCost: 0, helpText: "0.2x Atk", },
  slash_I: { name: "slash_I", Multiplier: 1, mpCost: 0, helpText: "1x Atk", },
  slash_II: { name: "slash_II", Multiplier: 1.3, mpCost: 0, helpText: "1.3x Atk", },
  slash_III: { name: "slash_III", Multiplier: 2, mpCost: 0, helpText: "2x Atk", },
  slash_IV: { name: "slash_IV", Multiplier: 3, mpCost: 0, helpText: "3x Atk", },
  tackle: { name: "tackle", Multiplier: 1.5, mpCost: 0, helpText: "1.5x Atk", },
  water: { name: "water", Multiplier: 0.1, mpCost: 10, helpText: "0.1x mAtk; Kill enemies below 20% HP", },
};

const allEnemies = {
  slime: { name: "slime", type: "🌊", skillList: ["water", "nudge"], difficultyRating: 1, killXp: 10, hp: 50, mp: 100, },
  fairy: { name: "fairy", type: "⚡", skillList: ["lightning"], difficultyRating: 1, killXp: 30, hp: 100, mp: 100, },
  minotaur: { name: "minotaur", type: "🪓", skillList: ["tackle", "slash_II"], difficultyRating: 2, killXp: 50, hp: 130, mp: 100, },
};

const allItems = {
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

const floors = {
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
    name: "1F",
    bossRoom: 19,
    encounterRooms: [9,],
    healRooms: [],
    treasureRooms: [],
  },
  f2: {
    name: "2F",
    bossLocation: 16,
    encounterRooms: [14,],
    healRooms: [],
    treasureRooms: [],
  },
  f3: {
    name: "3F",
    bossLocation: 0,
    encounterRooms: [16, 3],
    healRooms: [],
    treasureRooms: [],
  },
};

const icons = {
  player: "👣",
  boss: "☠️",
  battle: "⚔️",
  healing: "❤️",
  treasure: "💰",
  mp: "🔵",
  hp: "🟥",
};

const enemy = {
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
  },

  setEnemy: function (name) {
    enemy.clearSkillList();
    let newEnemy = allEnemies[name]; // get enemy by name
    enemy.name = newEnemy.name;
    // hp
    enemy.maxHp = newEnemy.hp;
    enemy.hp = enemy.maxHp;
    // mp
    enemy.maxMp = newEnemy.mp;
    enemy.mp = enemy.maxMp;
    // xp
    enemy.killXp = newEnemy.killXp;
    enemy.displayStats();
  },

  useSkill: function (name) {
    let skill = allSkills[name];
    enemy.mp = enemy.mp - skill.mpCost
  },

  clearSkillList: function () { enemy.skillList.length = 0; },

};

// player and inventory objects are better defined as classes.
const player = {
  stats: {
    atk: 50,
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
    maxXp: 100,
    totalXp: 0,
    addHp: function (num) {
      player.hp += num;
      if (player.hp > player.maxHp) player.hp = player.maxHp;
      player.stats.updateHp();
    },
    addMp: function (num) {
      player.mp += num;
      player.stats.updateMp();
    },
    addXp: function (num) {
      player.totalXp += num;
      player.xp += num;
      player.stats.updateXp();
    },
    lvUp: function () {
      (player.stats.xp > player.stats.maxXp) ?
        player.stats.xp = player.stas.xp - player.stats.maxXp :
        player.xp = 0;
      player.stats.lv++; // next level
      let nextLv = player.levels[`lv${player.stats.lv}`]; // get lv object
      player.stats
        .maxHp = nextLv.maxHp
          .maxMp = nextLv.maxMp
            .maxXp = nextLv.maxXp
              .hp = nextLv.maxHp
                .mp = nextLv.maxMp
      nextLv.newSkills.forEach((item) => player.inventory.skills.add(item));
    },
    lvUpCheck: function () {

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
    updateHp: function () {
      player.htmlElements.hpEl.textContent = `${player.stats.hp}/${player.stats.maxHp}`;
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
      player.stats
        .updateHp()
        .updateMp()
        .updateXp()
        .updateLv()
    },
  },

  htmlElements: {
    hpEl: document.querySelector('#player-hp'),
    mpEl: document.querySelector('#player-mp'),
    xpEl: document.querySelector('#player-xp'),
    lvEl: document.querySelector('#player-lv'),
  },

  levels: {
    lv1: { name: "Lv1", startingXp: 0, maxXp: 100, maxHp: 100, maxMp: 100, newSkills: ["slash_I", "nudge", "water",], },
    lv2: { name: "Lv2", startingXp: 0, maxXp: 300, maxHp: 120, maxMp: 120, newSkills: ["slash_II", "lightning",], },
    lv3: { name: "Lv3", startingXp: 0, maxXp: 300, maxHp: 140, maxMp: 140, newSkills: ["fire",], },
    lv4: { name: "Lv4", startingXp: 0, maxXp: 500, maxHp: 160, maxMp: 160, newSkills: ["slash_III",], },
    lv5: { name: "Lv5", startingXp: 0, maxXp: 1000, maxHp: 200, maxMp: 200, newSkills: ["slash_IV",], },
  },

  init: function () {
    player.inventory.init();
  },

  setLv: function (num) {
    if (num > player.stats.maxLv) num = player.stats.maxLv; // fix outrageous numbers
    if (num < 1) num = 1; // fix outrageous numbers
    if (!(player.levels[`lv${num}`])) return; // exit if level is not found
    player.stats.lv = num;
    let newLevel = player.levels[`lv${player.stats.lv}`];
    // player.displayLv();
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

  displayStats: function () {
    player.displayHp();
    player.displayMp();
    player.displayXp();
    player.displayLv();
  },

  sortArrayByNameProperty: function (arr) {
    arr.sort((a, b) => a.name.localeCompare(b.name));
  },

  removeItemFromArray: function (arr, item) {
    arr.splice(arr.indexOf(item), 1);
  },

  inventory: {
    currentTab: 'Skills',
    init: function () {
      player.inventory.addStartingItems();
      player.inventory.menu.elements.refresh();
      player.inventory.menu.elements.invMenuEl.addEventListener("click", player.inventory.menu.changeTab);
    },

    menu: {
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

      clearCommandBtns: function(){
        let menu = player.inventory.menu;
        menu.elements.refresh();
        menu.elements.commandBtnEls.forEach(el => el.remove());
      },

      addCommandButton: function (text) {
        let el = player.inventory.menu.elements.invEl;
        let nBtn = document.createElement('button');
        nBtn.type = 'button';
        nBtn.classList.add('inv-btn');
        nBtn.textContent = text;
        el.appendChild(nBtn);
        player.inventory.menu.elements.refresh();
      },

      changeTab: function(evt){
        // const tabNames = ['Skills','Items','Equipment'];
        if( !(evt.target.classList.contains('inv-menu-btn')) ) return; // only allow class of 'inv-menu-btn'
        let menu = player.inventory.menu;
        menu.clearCommandBtns();
        let list;
        switch(evt.target.textContent){
          case 'Skills':
            list = player.inventory.skills.list;
            break;
          case 'Items':
            list = player.inventory.items.list;
            break;
          case 'Equipment':
            list = player.inventory.equipment.list;
            break;
          default:
            console.log('[player.inventory.menu.changeTab()] No case for:', evt.target.textContent);
            return;
        };

        console.dir(list);
        list.forEach( item => menu.addCommandButton(item.name) );
        menu.elements.refresh();
      },

      setTab: function(){},
    },

    equipment: {
      list: [],
      clear: function () {
        player.inventory.equipment.list.length = 0;
      },
    },

    items: {
      list: [],
      add: function (...items) {
        for (let item of items) {
          if (!(item.name)) item = allItems[item]; // allow item to be an object or name
          if (!item) continue;
          player.inventory.items.list.push(item);
        };
      },
      remove: function () {
        if (!(item.name)) item = allItems[item]; // allow item to be object or name
        player.removeItemFromArray(player.items.list, item);
      },
      sort: function () {
        player.sortArrayByNameProperty(player.items.list);
      },
      use: function (item) {
        if (!(item.name)) item = allItems[item]; // allow item to be object or name
        if (item.type !== "consumable") return; // only consumables can be used
        switch (item.stat) {
          case "hp":
            player.stats.addHp(item.value);
            break;
          case "mp":
            player.stats.addMp(item.value);
            break;
          default:
            console.log(`[player.inventory.items.use()]no case statement for item stat: ${item.stat}`);
        };
      },
      clear: function () {
        player.inventory.items.list.length = 0;
      },
    },

    skills: {
      list: [],
      add: function (skill) {
        if (!(skill.name)) skill = allSkills[skill];
        player.skills.list.push(skill);
      },
      remove: function (skill) {
        if (!(skill.name)) skill = allSkills[skill];
        player.removeItemFromArray(player.skills.list, skill);
      },
      removeDuplicates: function () {
        player.skills.list = [...new Set(player.skills.list)];
      },
      sort: function () {
        player.sortArrayByNameProperty(player.skills.list);
      },
      use: function (skill, enemyObj) {
        if (!(skill.name)) skill = allSkills[skill]; // allow skill name or object to be passed in
        enemyObj.addHp(-(skill.Multiplier * player.atk));
        player.stats.addMp(-(skill.mpCost));
        player.stats.update();
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
};

/* const player = {
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
}; */
/* const inventory = {
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
}; */
// ===== Elements =====
const elem = {
  mapEl: document.querySelector("#map"),
  mapSquares: document.querySelectorAll(".sqr"),
  startSquare: document.querySelector(".sqr25"),
};

const battleLog = {
  element: document.querySelector('#battle-log'),
  logItems: document.querySelectorAll('#battle-log p'),

  init: function () {
    battleLog.clear();
  },

  newLogItem: function (pText) {
    if (!pText) { console.log('No text was passed to battleLog.newLogItem') };
    let logItem = document.createElement('p'); // new paragraph tag
    logItem.textContent = pText;
    battleLog.element.appendChild(logItem);
  },

  clear: function () {
    battleLog.logItems.forEach(ptag => ptag.remove());
    battleLog.logItems = document.querySelectorAll('#battle-log p');
  },
};

export {
  allSkills,
  allEnemies as enemies,
  allItems,
  floors,
  icons,
  enemy,
  elem,
  battleLog,
  player,
  // inventory,
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
*/