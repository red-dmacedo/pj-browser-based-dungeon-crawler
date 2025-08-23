import * as data from "./data-rewrite.js";

const resetBtnEl = document.querySelector('#reset');
const rollNum = data.rollNum;
// ===== Game Object =====
const game = {
  // map: null,
  init: function () {
    (game.map) ? game.map.reset() : game.map = new data.Map; // reset if map exists or initialize map
    (game.player) ? game.player.reset() : game.player = new data.PlayerCharacter;
    game.enemies = [...data.allEnemies].filter(el => el.difficultyRating <= game.map.currentFloor && el.className === 'normal');
  },

  selectEnemy: () => {
    console.log(game);
    const enemyCount = game.enemies.length;
    const selection = rollNum(enemyCount-1);
    game.selection = selection;
    // console.log(game.enemies[selection]);
    game.enemy = data.EnemyCharacter.fromObject(game.enemies[selection]);
  },

  setEnemies: () => {
    game.enemies = [...data.allEnemies].filter(el => el.difficultyRating <= game.map.currentFloor && el.className === 'normal');
  },
};

// ===== Script =====
game.init();
resetBtnEl.addEventListener("click", () => {
  game.init();
});

// console.log(game.enemies[0])
// console.log(game.map.currentFloor)
game.selectEnemy();
game.enemy.name = 'not a goblin?'
console.log(game.enemy);
console.log(game.enemies[game.selection])
console.log(game.enemies);