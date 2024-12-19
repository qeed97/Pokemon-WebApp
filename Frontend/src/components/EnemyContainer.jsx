import React from 'react';
import battleHelper from "../helpers/battleHelper.js";
import Healthbar from "./Healthbar.jsx";

export default function EnemyContainer({enemyPokemon}) {
    return (
        <div className="enemy-container">
            <div className="enemy-data">
                <p>{enemyPokemon.name}</p>
                <Healthbar currentHealt={battleHelper.gameData.enemy.hp} healt={enemyPokemon.stats[0].base_stat}/>
            </div>
            <div className='enemy-picture'>
                <div className='img-container'>
                    <img src={enemyPokemon.sprites.front_default} alt={enemyPokemon.name}></img>
                </div>
            </div>
        </div>
    );
}

