import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import EnemyContainer from "./EnemyContainer";
import battleHelper from "../helpers/battleHelper";

vi.mock("../helpers/battleHelper", () => ({
    default: {
        gameData: {
            enemy: {
                hp:80,
            },
        },
    },
}));

const mockEnemyPokemon = {
    name: "Charizard",
    sprites: {
        front_default: "front_default.png",
    },
    stats: [{ base_stat: 150 }], // HP stat
};

describe("EnemyContainer Component", () => {
    it("renders the enemy Pokemons name and image", () => {
       render(
           <EnemyContainer enemyPokemon={mockEnemyPokemon} animation="" />
       );

       expect(screen.getByText("Charizard")).toBeInTheDocument();

       const pokemonImage = screen.getByRole("img", { name: /Charizard/i });
       expect(pokemonImage).toBeInTheDocument();
       expect(pokemonImage).toHaveAttribute("src", mockEnemyPokemon.sprites.front_default);
    });

    it("renders the health bar with correct health values", () => {
        render(<EnemyContainer enemyPokemon={mockEnemyPokemon} animation="" />);

        const healthText = screen.getByText("150/80");
        expect(healthText).toBeInTheDocument();
    });
})