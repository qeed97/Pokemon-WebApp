import React from 'react';
import Healthbar from './Healthbar.jsx';

export default function AllyContainer({ allyPokemon, gameData, animation}) {
    return (
        <div className="h-[40%] flex items-end text-sm animate-slide-in-right">
            <div className={`${animation}`}>
                <img className="image-pixelated w-[400px] h-[400px]" src={allyPokemon.sprites.back_default} alt={allyPokemon.name}/>
            </div>
            <div className="w-[400px]">
                <p>{allyPokemon.name}</p>
                <Healthbar currentHealth={gameData.ally.hp} health={allyPokemon.stats[0].base_stat}/>
            </div>
        </div>
    );
};