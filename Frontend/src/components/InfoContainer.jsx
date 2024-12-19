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
        <div className='info-container h-[10%] text-sm text-center flex flex-col content-evenly items-center' data-testid='info-container'>
            {!battlehelper.gameData.gameOver ? (
                <div>
                    <p className='info'>{battlehelper.gameData.info}</p>
                    <button className='attack-btn absolute right-[30%] bottom-[5%] px-2 py-1 border border-solid border-[#fcfaf8] rounded-[5px] bg-[#fcfaf8] text-[#031e19] cursor-pointer transition-all duration-100 ease-in-out text-[0.875rem] hover:bg-[#cb2327] hover:border-[#cb2327] hover:border-solid hover:text-[#fcfaf8]' onClick={() => handleAttack(enemyPokemon, allyPokemon)}>Attack
                    </button>
                </div>
            ) : (
                <div>
                    <div>{battlehelper.gameData.winner}</div>
                    {battlehelper.gameData.winner === 'You won!' && !localStorage.getItem('currentPokemons').includes(enemyPokemon.name)
                        ? <p>{enemyPokemon.name} has been added to your pokemon collection!</p>
                        : battlehelper.gameData.winner === 'You won!' && localStorage.getItem('currentPokemons').includes(enemyPokemon.name)
                            ? <p>{enemyPokemon.name} is already in your pokemon collection!</p>
                            : <p>better luck next time!</p>}
                    <button className="px-2 py-1 border border-solid border-[#fcfaf8] rounded-[5px] bg-[#fcfaf8] text-[#031e19] cursor-pointer transition-all duration-100 ease-in-out text-[0.875rem] hover:bg-[#cb2327] hover:border-[#cb2327] hover:border-solid hover:text-[#fcfaf8]" onClick={() => {
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