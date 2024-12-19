// battle formula  ((((2/5+2)*B*60/D)/50)+2)*Z/255

let currentEnemyHp = Infinity;
let currentAllyHp = Infinity;

let isPlayerTurn = true;
let gameData = {
  enemy:{},
  ally:{},
  gameStart:true,
  gameOver:false,
  winner:'',
  info:''
};

let aiTurnDelay;
let caughtPokemon = '';
let currentPokemons = '';

function gameLoop(enemy, ally) {
    currentPokemons = localStorage.getItem('currentPokemons');
    if (currentEnemyHp === enemy.stats[0].base_stat || currentEnemyHp === Infinity) {
        currentEnemyHp = enemy.stats[0].base_stat;
    }

    if (currentAllyHp === ally.stats[0].base_stat || currentAllyHp === Infinity) {
        currentAllyHp = ally.stats[0].base_stat;
    }

    if (isPlayerTurn && !gameData.gameOver){
        gameData.gameStart = false;
        playerTurn(enemy, ally);
    }

    if (!isPlayerTurn && !gameData.gameOver){
        clearTimeout(aiTurnDelay);
        aiTurnDelay = setTimeout(() => aiTurn(enemy, ally), 1000);
    }
}

function playerTurn(enemy, ally){
    let Z = randomGenerator(217, 255);
    let damage = Math.floor(((((2/5+2)*ally.stats[1].base_stat*60/enemy.stats[2].base_stat)/50)+2)*Z/255);
    currentEnemyHp = currentEnemyHp - damage < 0 ? 0 : currentEnemyHp - damage;
    gameData.enemy.hp = currentEnemyHp;
    gameData.ally.damage = damage;
    let randomAbilityIndex = randomGenerator(0, ally.abilities.length);
    gameData.info = `${ally.name} attacked with ${ally.abilities[randomAbilityIndex].ability.name.replaceAll('-',' ')} and dealt ${damage} damage.`;
    gameOver(currentEnemyHp, enemy);
    isPlayerTurn = false;
}

function aiTurn(enemy, ally){
    let Z = randomGenerator(217, 255);
    let damage = Math.floor(((((2/5+2)*enemy.stats[1].base_stat*60/ally.stats[2].base_stat)/50)+2)*Z/255);
    currentAllyHp = currentAllyHp - damage < 0 ? 0 : currentAllyHp - damage;
    gameData.ally.hp = currentAllyHp;
    gameData.enemy.damage = damage;
    let randomAbilityIndex = randomGenerator(0, enemy.abilities.length);
    gameData.info = `${enemy.name} attacked with ${enemy.abilities[randomAbilityIndex].ability.name.replaceAll('-',' ')} and dealt ${damage} damage.`
    gameOver(currentAllyHp);
    isPlayerTurn = true;
}

function gameOver(currentHp, enemy =''){
    if (currentHp <= 0){
        if (isPlayerTurn){
            gameData.winner = 'You won!';
            gameData.gameOver = true;
            if (enemy !== '' && !currentPokemons.includes(enemy.name)) {
                caughtPokemon = `,https://pokeapi.co/api/v2/pokemon/${enemy.name}`;
            }
        } else {
            gameData.winner = 'You lost!';
            gameData.gameOver = false;
        }
    }
}

function resetBattle(){
    console.log(currentPokemons);
    if (!currentPokemons.includes(caughtPokemon)) {
        currentPokemons += caughtPokemon;
    }
    localStorage.setItem('currentPokemons', currentPokemons);
    isPlayerTurn = true;
    gameData.gameOver = false;
    gameData.winner = '';
    gameData.gameStart = true;
    gameData.info = '';
    gameData.enemy = {};
    gameData.ally = {};
    currentEnemyHp = Infinity;
    currentAllyHp = Infinity;
}

function randomGenerator(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export default {
    gameLoop,
    gameData,
    resetBattle,
};