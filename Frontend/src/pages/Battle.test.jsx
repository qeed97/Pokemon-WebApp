import { describe, it, beforeEach, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Battle from "./Battle";
import battleHelper from "../helpers/battleHelper";

beforeEach(() => {
    const mockLocalStorage = (() => {
        let store = {};
        return {
            getItem: (key) => store[key] || null,
            setItem: (key, value) => {
                store[key] = value.toString();
            },
            clear: () => {
                store = {};
            },
        };
    })();
    Object.defineProperty(window, "localStorage", { value: mockLocalStorage });
    window.localStorage.clear();
    localStorage.setItem("currentPokemons", "pikachu,bulbasaur");

    // Reset battleHelper state before each test
    battleHelper.resetBattle();
});

const mockAllyPokemon = {
    name: "pikachu",
    sprites: { back_default: "back-sprite.png" },
    stats: [
        { base_stat: 100 }, // HP
        { base_stat: 60 },  // Attack
        { base_stat: 50 },  // Defense
    ],
    abilities: [{ ability: { name: "thunderbolt" } }],
};

const mockEnemyPokemon = {
    name: "charmander",
    sprites: { front_default: "front-sprite.png" },
    stats: [
        { base_stat: 100 }, // HP
        { base_stat: 55 },  // Attack
        { base_stat: 40 },  // Defense
    ],
    abilities: [{ ability: { name: "ember" } }],
};

describe("Battle Page", () => {
    it("renders all containers correctly", () => {
        render(
            <Router>
                <Battle allyPokemon={mockAllyPokemon} enemyPokemon={mockEnemyPokemon} />
            </Router>
        );

        expect(screen.getByText("pikachu")).toBeInTheDocument(); // Ally Pokémon
        expect(screen.getByText("charmander")).toBeInTheDocument(); // Enemy Pokémon
    });

    it("handles attack button click", () => {
        const gameLoopSpy = vi.spyOn(battleHelper, "gameLoop");

        render(
            <Router>
                <Battle allyPokemon={mockAllyPokemon} enemyPokemon={mockEnemyPokemon} />
            </Router>
        );

        const attackButton = screen.getByText("Attack");
        fireEvent.click(attackButton);

        expect(gameLoopSpy).toHaveBeenCalledWith(
            mockEnemyPokemon,
            mockAllyPokemon,
            expect.any(Function), // setEnemyAnimation
            expect.any(Function)  // setAllyAnimation
        );
    });
});