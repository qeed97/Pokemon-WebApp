import battleHelper from "../helpers/battleHelper";
import {describe, it , expect, vi, beforeEach} from "vitest";

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
    battleHelper.resetBattle(); // Reset state before each test
    localStorage.setItem("currentPokemons", "pikachu,bulbasaur");
});

describe("battleHelper.js", () => {
    beforeEach(() => {
        battleHelper.resetBattle(); // Reset the state before each test
        localStorage.setItem("currentPokemons", "pikachu,bulbasaur");
    });

    it("gameLoop processes player turn correctly", () => {
        const mockEnemy = {
            name: "charmander",
            stats: [
                { base_stat: 100 },
                { base_stat: 50 },
                { base_stat: 30 },
            ],
            abilities: [{ ability: { name: "ember" } }],
        };

        const mockAlly = {
            name: "pikachu",
            stats: [
                { base_stat: 80 },
                { base_stat: 60 },
                { base_stat: 40 },
            ],
            abilities: [{ ability: { name: "thunderbolt" } }],
        };

        const setEnemyAnimation = vi.fn();
        const setAllyAnimation = vi.fn();

        battleHelper.gameLoop(mockEnemy, mockAlly, setEnemyAnimation, setAllyAnimation);

        expect(battleHelper.gameData.gameStart).toBe(false);
        expect(battleHelper.gameData.info).toContain(mockAlly.name);
        expect(setEnemyAnimation).toHaveBeenCalledWith("animate-defend");
        expect(setAllyAnimation).toHaveBeenCalledWith("animate-mirroredAttack");
    });

    it("playerTurn calculates damage correctly", () => {
        const mockEnemy = {
            name: "charmander",
            stats: [
                { base_stat: 100 },
                { base_stat: 50 },
                { base_stat: 30 },
            ],
            abilities: [{ ability: { name: "ember" } }],
        };

        const mockAlly = {
            name: "pikachu",
            stats: [
                { base_stat: 80 },
                { base_stat: 60 },
                { base_stat: 40 },
            ],
            abilities: [{ ability: { name: "thunderbolt" } }],
        };

        const setEnemyAnimation = vi.fn();
        const setAllyAnimation = vi.fn();

        battleHelper.gameLoop(mockEnemy, mockAlly, setEnemyAnimation, setAllyAnimation);

        const initialEnemyHp = mockEnemy.stats[0].base_stat;
        expect(battleHelper.gameData.enemy.hp).toBeLessThan(initialEnemyHp); // Damage dealt
    });

    it("resetBattle resets the state correctly", () => {
        battleHelper.gameData.gameOver = true;
        battleHelper.gameData.winner = "You won!";
        battleHelper.resetBattle();

        expect(battleHelper.gameData.gameOver).toBe(false);
        expect(battleHelper.gameData.winner).toBe("");
        expect(localStorage.getItem("currentPokemons")).toContain("pikachu");
    });
});