import React from 'react';
import Healthbar from './Healthbar.jsx';
import battleHelper from '../helpers/battleHelper.js';

export default function AllyContainer({ allyPokemon, gameData }) {
    return (
        <div className="ally-container h-[40%] flex items-end text-sm animate-slide-in-right">
            <div className="ally-picture">
                <img className="image-pixelated w-[400px] h-[400px]" src={allyPokemon.sprites.back_default} alt={allyPokemon.name}/>
            </div>
            <div className="ally-data w-[400px]">
                <p>{allyPokemon.name}</p>
                <Healthbar currentHealth={gameData.ally.hp} health={allyPokemon.stats[0].base_stat}/>
            </div>
        </div>
    );
};