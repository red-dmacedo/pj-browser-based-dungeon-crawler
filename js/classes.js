class charPointsObj {
  constructor(value) {
    this.value = value;
    this.maxValue = value;
  };

  constructor(value, maxValue) {
    this.value = value;
    this.maxValue = maxValue;
  };

  add(val) {
    this.value += val;
    if (this.value > this.maxValue) this.value = this.maxValue;
  };

  subtract(val) {
    this.value -= val;
  };
};

class charStatusObj {
  constructor() {
    this.list = [];
  };

  constructor(list) {
    this.list = list;
  };

  add(statusObj) {
    this.list.push(statusObj);
  };

  clear() {
    this.list.length = 0;
  };

};

class charSkillsObj {
  constructor() {
    this.list = [];
  };
  constructor(list) {
    this.list = list;
  };

  sort() {
    this.list.sort((a, b) => a.name.localeCompare(b.name));
  };

  clear() {
    this.list.length = 0;
  };

  removeDuplicates() {
    this.list = [...new Set(this.list)];
  };
};

class skillObj {
  constructor(){
    this.name = '';
    this.Multiplier = 1;
    this.mpCost = 0;
    this.helpText = '';
    this.status = {type: none, duration: 0};
  };
};

// skills: {
//   list: [],
//   add: function (skil) {
//     const skills = player.skills
//     if (typeof (skil) === 'string') skil = allSkills.filter(el => el.name === skil.toLowerCase())[0];
//     if (typeof (skil) !== 'object') { console.log('[player.skills.add()] Item is not an object:', skil); return; };
//     if (!allSkills.includes(skil)) console.log('[player.skills.add()] Item does not exist:', skil);
//     skills.list.push(skil);
//     skills.removeDuplicates();
//     skills.sortList();
//   },
// },

// { name: "lightning", Multiplier: 0.5, mpCost: 20, helpText: "0.5x mAtk; Chance to stun enemy", status: { duration: 0, }, },