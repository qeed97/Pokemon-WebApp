import React, {useEffect, useState} from 'react';
import fetchFunctions from "../helpers/fetchFunctions.js";
import {useNavigate} from "react-router-dom";

const usersPokemon = [
    "https://pokeapi.co/api/v2/pokemon/bulbasaur",
    "https://pokeapi.co/api/v2/pokemon/charizard",
    "https://pokeapi.co/api/v2/pokemon/arceus"
];

let currentPokemons = '';

export default function Encounter(props) {
    const navigate = useNavigate();
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
            const area = await fetchFunctions.fetchArea(lockey, encId);
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
                <div className="encounter relative w-full h-[100vh] flex flex-col items-center">
                    <div className="enemy-container w-full h-[40%] flex flex-col justify-center items-center">
                        <img className="image-pixelated w-[200px] h-[200px]" src={encounter.sprites.front_default} alt={encounter.name}></img>
                    </div>
                    <div className="info-container w-full flex flex-col justify-center items-center gap-4 h-[5%]">
                        <p>This location doesn't seem to have any pokémon</p>
                        <button className="p-1 border border-solid border-[#fcfaf8] rounded-[5px] bg-[#fcfaf8] text-[#031e19] cursor-pointer transition-all ease-in-out text-[0.875rem] hover:bg-[#cb2327] hover:border-[#cb2327] hover:border-solid hover:text-[#fcfaf8]" onClick={() => navigate('/')}>get back to locations</button>
                    </div>
                </div>
            )}
            {encounter && !encounter.name.includes('location') && (
                <div className="encounter relative w-full h-[100vh] flex flex-col items-center">
                    <div className="enemy-container w-full h-[40%] flex flex-col justify-center items-center">
                        <img className="image-pixelated w-[200px] h-[200px]" src={encounter.sprites.front_default} alt={encounter.name}></img>
                        <p> A wild {encounter.name} appeared!</p>
                    </div>
                    <div className="info-container w-full flex flex-col justify-center items-center gap-4 h-[5%]">
                        <button className="px-2 py-1 border border-solid border-[#fcfaf8] rounded-[5px] bg-[#fcfaf8] text-[#031e19] cursor-pointer transition-all duration-100 ease-in-out text-[0.875rem] hover:bg-[#cb2327] hover:border-[#cb2327] hover:border-solid hover:text-[#fcfaf8]" onClick={() => navigate('/')}>run away</button>
                        <p className="info">Choose your pokemon to fight!</p>
                    </div>
                    <div className="ally-container relative flex flex-wrap items-center justify-center gap-4 pt-8">
                        {pokemons && pokemons.map((data, index) => (
                            <div className="group text-center border-[#fcfaf8] border-2 border-solid rounded-[5px] p-2 cursor-pointer transition-all ease-in-out hover:border-2 hover:border-[#cb2327] hover:border-solid" key={index} onClick={() => {
                                setAllyPokemon(data);
                                setEnemyPokemon(encounter);
                                navigate('/battle');
                            }
                            }>
                                <img className="image-pixelated w-[200px] h-[200px] group-hover:transform group-hover:scale-[1.025]" src={data.sprites.front_default} alt={data.name}></img>
                                <p className="bg-[#fcfaf8] text-[#031e19] group-hover:bg-[#cb2327] group-hover:text-[#fcfaf8]">{data.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}