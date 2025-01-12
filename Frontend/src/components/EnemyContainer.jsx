import React from 'react';
import battleHelper from "../helpers/battleHelper.js";
import Healthbar from "./Healthbar.jsx";

export default function EnemyContainer({enemyPokemon, animation}) {
    return (
        <div className="h-[40%] flex justify-end items-start text-right text-sm animate-slide-in-left">
            <div className="w-[400px]">
                <p>{enemyPokemon.name}</p>
                <Healthbar currentHealth={battleHelper.gameData.enemy.hp} health={enemyPokemon.stats[0].base_stat}/>
            </div>
            <div className={`${animation}`}>
                <div className='img-container'>
                    <img className="image-pixelated w-[400px] h-[400px]" src={enemyPokemon.sprites.front_default} alt={enemyPokemon.name}></img>
                </div>
            </div>
        </div>
    );
}

