const fetchArea = async () => {
    try {
        const res = await fetch(`${lockey}/${encId}`);
        return await res.json();
    } catch (e) {
        console.error(e);
    }
}

const fetchEncounters = async (area) => {
    try {
        const res = await fetch(area[0].url);
        return await res.json();
    } catch (e) {
        console.error(e);
    }
}

const chooseRandomPokemon = (encounters) => {
    const pokemonEncounters = encounters.pokemon_encounters;
    const rand = Math.floor(Math.random() * pokemonEncounters.length);
    return pokemonEncounters[rand].pokemon.url;
}

const fetchPokemon = async (pokemonUrl) => {
    try {
        const res = await fetch(pokemonUrl);
        return await res.json();
    } catch (e) {
        console.error(e);
    }
}

export default {
    fetchArea,
    chooseRandomPokemon,
    fetchEncounters,
    fetchPokemon
}