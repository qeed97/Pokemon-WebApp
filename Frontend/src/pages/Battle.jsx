import React, {useState} from 'react';
import battleHelper from '../helpers/battleHelper.js';
import EnemyContainer from "../components/EnemyContainer.jsx";
import InfoContainer from "../components/InfoContainer.jsx";
import AllyContainer from "../components/AllyContainer.jsx";

export default function Battle(props) {
    const [gameData, setGameData] = useState(battleHelper.gameData);
    const allyPokemon = props.allyPokemon;
    const enemyPokemon = props.enemyPokemon;

    return (
        <div>
            <div className="battle">
                <EnemyContainer enemyPokemon={enemyPokemon} setGameData={setGameData}/>
                <InfoContainer enemyPokemon={enemyPokemon} allyPokemon={allyPokemon} setGameData={setGameData}/>
                <AllyContainer allyPokemon={allyPokemon} gameData={gameData}/>
            </div>
        </div>
    );
}