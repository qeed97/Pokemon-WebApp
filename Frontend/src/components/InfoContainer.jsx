import React from 'react';
import battlehelper from '../helpers/battlehelper.js';
import {useNavigate} from "react-router-dom";

export default function InfoContainer({enemyPokemon, allyPokemon, setGameData}) {
    const navigate = useNavigate();
    function handleAttack(enemy, ally) {
        battlehelper.gameLoop(enemy,ally);
        setGameData({...battlehelper.gameData});
        setTimeout(() => setGameData({...battlehelper.gameData}), 1100);
    }

    return (
        <div className='info-container' data-testid='info-container'>
            {!battlehelper.gameData.gameOver ? (
                <div>
                    <p className='info'>{battlehelper.gameData.info}</p>
                    <button className='attack-btn' onClick={() => handleAttack(enemyPokemon, allyPokemon)}>Attack
                    </button>
                </div>
            ) : (
                <div>
                    <div>{battlehelper.gameData.winner}</div>
                    {battlehelper.gameData.winner === 'You won' && !localStorage.getItem('currentPokemons').includes(enemyPokemon.name)
                        ? <p>{enemyPokemon.name} has been added to your pokemon collection!</p>
                        : battlehelper.gameData.winner === 'You won' && localStorage.getItem('currentPokemons').includes(enemyPokemon.name)
                            ? <p>{enemyPokemon.name} is already in your pokemon collection!</p>
                            : <p>better luck next time!</p>}
                    <button onClick={() => {
                        battlehelper.resetBattle();
                        setGameData({...battlehelper.gameData});
                        navigate('/');
                    }}>Go home
                    </button>
                </div>
            )}
        </div>
    );
};