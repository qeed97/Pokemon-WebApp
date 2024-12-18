import React from 'react';
import Healthbar from './Healthbar.jsx';

export default function AllyContainer({ allyPokemon, gameData }) {
    return (
        <div className="ally-container">
            <div className="ally-picture">
                <img src={allyPokemon.sprites.back_default} alt={allyPokemon.name}/>
            </div>
            <div className="ally-data">
                <p>{allyPokemon.name}</p>
                <Healthbar currentHealth={gameData.ally.hp} health={allyPokemon.stats[0].base_stat}/>
            </div>
        </div>
    );
};