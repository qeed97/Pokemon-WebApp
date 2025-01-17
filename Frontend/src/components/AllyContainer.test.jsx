import { render, screen } from '@testing-library/react';
import AllyContainer from './AllyContainer';
import Healthbar from './Healthbar';
import { describe, it, vi, expect } from "vitest";

const mockAllyPokemon = {
    name: "Pikachu",
    sprites: {
        back_default: "back_default.png",
    },
    stats: [{base_stat: 100}],
};

const mockGameData = {
    ally: {
        hp: 50,
    },
};

describe("AllyContainer Component", () => {
    it("renders the ally Pokemons name and image", () => {
        render(
            <AllyContainer
            allyPokemon={mockAllyPokemon}
            gameData={mockGameData}
            animation="" />
        );

        expect(screen.getByText("Pikachu")).toBeInTheDocument();

        const pokemonImage = screen.getByRole("img", { name: /Pikachu/i });
        expect(pokemonImage).toBeInTheDocument();
        expect(pokemonImage).toHaveAttribute("src", mockAllyPokemon.sprites.back_default);
    });

    it("renders the health bar with correct health values", () => {
       render(
           <AllyContainer
           allyPokemon={mockAllyPokemon}
           gameData={mockGameData}
           animation="" />
       );

       const healthText = screen.getByText("100/50");
       expect(healthText).toBeInTheDocument();
    });
});