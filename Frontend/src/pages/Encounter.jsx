import React, {useEffect, useState} from 'react';
import fetchFunctions from "../helpers/fetchFunctions.js";

const usersPokemon = [
    "https://pokeapi.co/api/v2/pokemon/bulbasaur",
    "https://pokeapi.co/api/v2/pokemon/charizard",
    "https://pokeapi.co/api/v2/pokemon/arceus"
];

let currentPokemons = '';

export default function Encounter(props) {
    const encId = props.encId;
    const [encounter, setEncounter] = useState(null);
    const setEnemyPokemon = props.setEnemyPokemon;
    const setAllyPokemon = props.setAllyPokemon;
    const [pokemons, setPokemons] = useState(null);

    if (localStorage.getItem('currentPokemons') !== null) {
        currentPokemons = localStorage.getItem('currentPokemons');
    } else {
        localStorage.setItem('currentPokemons', usersPokemon);
        currentPokemons = localStorage.getItem('currentPokemons');
    }

    const lockey = 'https://pokeapi.co/api/v2/location';

    useEffect( () => {
        const fetchData = async () => {
            const area = await fetchFunctions.fetchArea();
            if (area.areas.length > 0 && Array.isArray(area.areas)) {
                const encounters = await fetchFunctions.fetchEncounters(area.areas);
                const pokemonUrl = fetchFunctions.chooseRandomPokemon(encounters);
                const enemyPokemon = await fetchFunctions.fetchPokemon(pokemonUrl);
                setEncounter(enemyPokemon);
            } else {
                setEncounter({
                    name: "This location doesn't seem to have any pokémon",
                    sprites: {
                        front_default: "https://www.pngkey.com/png/full/757-7574864_bola-pokemon-png.png",
                    },
                })
            }
        }
        fetchData();
    }, [encId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (localStorage.getItem('currentPokemons') !== null){
                    currentPokemons = localStorage.getItem('currentPokemons');
                } else {
                    localStorage.setItem('currentPokemons', usersPokemon);
                    currentPokemons = localStorage.getItem('currentPokemons');
                }
                const pokemonData = await Promise.all(
                    currentPokemons.split(',').map(async (url) => {
                        return await fetchFunctions.fetchPokemon(url);
                    })
                );
                setPokemons(pokemonData);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            {encounter && encounter.name.includes('location') && (
                <div className="encounter">
                    <div className="enemy-container">
                        <img src={encounter.sprites.front_default} alt={encounter.name}></img>
                    </div>
                    <div className="info-container">
                        <p>This location doesn't seem to have any pokémon</p>
                        <button onClick={() => /* NAVIGATE setPage('home')*/console.log("HOME")}>get back to locations</button>
                    </div>
                </div>
            )}
            {encounter && !encounter.name.includes('location') && (
                <div className="encounter">
                    <div className="enemy-container">
                        <img src={encounter.sprites.front_default} alt={encounter.name}></img>
                        <p> A wild {encounter.name} appeared!</p>
                    </div>
                    <div className="info-container">
                        <button onClick={() => /* NAVIGATE setPage('home')*/console.log("HOME")}>run away</button>
                        <p className="info">Choose your pokemon to fight!</p>
                    </div>
                    <div className="ally-container">
                        {pokemons && pokemons.map((data, index) => (
                            <div key={index} onClick={() => {
                                setAllyPokemon(data);
                                //NAVIGATE setPage('battle');
                                setEnemyPokemon(encounter)
                            }
                            }>
                                <img src={data.sprites.front_default} alt={data.name}></img>
                                <p>{data.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}