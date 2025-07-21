class CharacterStatPoints {
  constructor(maxValue) {
    this.value = maxValue || 10;
    this.maxValue = maxValue || 10;
  }

  // Methods
  add(value) {
    if (typeof value !== 'number') console.error(`Cannot add: ${value}`);
    this.value += value;
    if (this.value > this.maxValue) this.value = this.maxValue;
  }

  subtract(value) {
    if (typeof value !== 'number') console.error(`Cannot add: ${value}`);
    this.value -= value;
  }

  setValueAndMaxValue(value) {
    this.value = value;
    this.maxValue = value;
  }

  // value setters / getters
  set value(value) {
    if (typeof value !== 'number') console.error(`Value should be a number: ${value}`);
    this._value = value;
  }

  get value() {
    return this._value;
  }

  // maxValue setters / getters
  set maxValue(value) {
    if (typeof value !== 'number') console.error(`maxValue should be a number: ${value}`);
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

  add(value) {
    if (typeof value !== 'number') console.error(`Cannot add: ${value}`);
    this.value += value;
  }

  canLvUp() {
    return this.value >= this.maxValue;
  }
}

class CharacterStatus {
  constructor(list) {
    this.list = list || [];
  };

  // set / get list of status effects
  set list(list) {
    if (typeof list !== 'array') console.error(`list must be an array: ${list}`);
    this._list = list;
  };

  get list() {
    return this._list;
  }

  // methods
  add(statusEffect) {
    if (!(statusEffect instanceof StatusEffect)) console.error(`Not a StatusEffect: ${statusEffect}`);
    this.list.push(statusEffect);
  };

  clear() {
    this.list.length = 0;
  };

};

class CharacterSkills {
  constructor(list) {
    this.list = list || [];
  };

  // set / get list of status effects
  set list(list) {
    if (typeof list !== 'array') console.error(`list must be an array: ${list}`);
    this._list = list;
  };

  get list() {
    return this._list;
  }

  // Methods
  push(item) {
    if (!(item instanceof Skill)) console.error(`Item was not a skill: ${item}`);
    this.list.push(item);
    this.removeDuplicates();
  }

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

class StatusEffect {
  constructor(type, duration, description) {
    //    stun: cannot move,    dot: damage over time
    // effect types: stun, dot, regenHp, regenMp
    this.type = type || 'none';
    this.duration = duration || 0;
    this.description = description || 'none';
  }

  static fromObject(obj) {
    if (typeof obj !== 'object') console.error(`An object must contain the properties of type, duration, description: ${obj}`);
    let type, duration, description;
    type = obj.type || 'none'; // Default value if type is not defined
    duration = obj.duration || 0;
    description = obj.description || 'none';
    return new StatusEffect(type, duration, description);
  }

  set type(value) {
    if (typeof value !== 'string') console.error(`type must be a string value: ${value}`);
    this._type = value;
  }

  set duration(value) {
    if (typeof value !== 'number') console.error(`duration must be a number: ${value}`);
    this._duration = value;
  }

  set description(value) {
    if (typeof value !== 'string') console.error(`description must be a string value: ${value}`);
    this._description = value;
  }
};

class Skill {
  constructor(name, multiplier, mpCost, helpText, statusEffectObj) {
    this.name = name || 'none';
    this.multiplier = multiplier || 1;
    this.mpCost = mpCost || 0;
    this.helpText = helpText || 'none';
    this.statusEffect = statusEffectObj || new StatusEffect;
  }

  static fromObject(obj) {
    if (typeof obj !== 'object') console.error(`Not an object: ${obj}`);
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
    if (typeof name !== 'string') console.error(`name must be a string value: ${name}`);
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set multiplier(value) {
    if (typeof value !== 'number') console.error(`multiplier must be a number or decimal: ${value}`);
    this._multiplier = value;
  }

  get multiplier() {
    return this._multiplier;
  }

  set mpCost(value) {
    if (typeof value !== 'number') console.error(`multiplier must be a number or decimal: ${value}`);
    this._mpCost = value;
  }

  get mpCost() {
    return this._mpCost;
  }

  set helpText(text) {
    if (typeof text !== 'string') console.error(`name must be a string value: ${text}`);
    this._helpText = text;
  }

  get helpText() {
    return this._helpText;
  }

  set statusEffect(statusEffectObj) {
    if (!(statusEffectObj instanceof StatusEffect)) console.error(`Not a StatusEffect: ${statusEffectObj}`);
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

  static fromObject(obj) {
    let name, stat, value, helpText;
    name = obj.name || 'none';
    stat = obj.stat || 'hp';
    value = obj.value || 0;
    helpText = obj.helpText || 'none';
    return new Item(name, stat, value, helpText);
  }

  // set / get name
  set name(name) {
    if (typeof name !== 'string') console.error(`name must be a string value: ${name}`);
    this._name = name;
  }

  get name() {
    return this._name;
  }

  // set / get stat
  set stat(stat) {
    stat = stat.toLowerCase();
    if (stat !== 'hp' && stat !== 'mp') console.error(`stat must be 'hp' or 'mp': ${stat}`);
    this._stat = stat;
  }

  get stat() {
    return this._stat;
  }

  // set / get stat
  set value(value) {
    if (typeof value !== 'number') console.error(`value must be a number: ${value}`);
    this._value = value;
  }

  get value() {
    return this._value;
  }
};

class Player {
  constructor() {
    this.hp = new CharacterStatPoints(50);
    this.mp = new CharacterStatPoints(50);
    this.xp = new CharacterXp(50);
    this.status = new CharacterStatus;
    this.skills = new CharacterSkills;
  }
}

export {
  Player,
  Skill,
  StatusEffect,
  Item,
}

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