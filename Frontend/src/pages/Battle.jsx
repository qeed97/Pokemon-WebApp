import React, {useState} from 'react';
import battleHelper from '../helpers/battleHelper.js';
import EnemyContainer from "../components/EnemyContainer.jsx";
import InfoContainer from "../components/InfoContainer.jsx";
import AllyContainer from "../components/AllyContainer.jsx";

export default function Battle(props) {
    const [gameData, setGameData] = useState(battleHelper.gameData);

    const [enemyAnimation, setEnemyAnimation] = useState('');
    const [allyAnimation, setAllyAnimation] = useState('');

    const allyPokemon = props.allyPokemon;
    const enemyPokemon = props.enemyPokemon;

    const handleAttack = () => {
        battleHelper.gameLoop(enemyPokemon, allyPokemon, setEnemyAnimation, setAllyAnimation);
        setGameData({...battleHelper.gameData});
        setTimeout(() =>{
            setEnemyAnimation('');
            setAllyAnimation('');
            setGameData({...battleHelper.gameData});
        }, 1100);
    }

    return (
        <div>
            <div className="battle flex flex-col justify-center w-[80%] h-[100vh] m-auto">
                <EnemyContainer enemyPokemon={enemyPokemon} setGameData={setGameData} animation={enemyAnimation}/>
                <InfoContainer enemyPokemon={enemyPokemon} allyPokemon={allyPokemon} setGameData={setGameData} handleAttack={handleAttack}/>
                <AllyContainer allyPokemon={allyPokemon} gameData={gameData} animation={allyAnimation}/>
            </div>
        </div>
    );
}