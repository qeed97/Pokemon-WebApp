import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import InfoContainer from "./InfoContainer";
import battleHelper from "../helpers/battleHelper";
import { BrowserRouter } from "react-router-dom";

vi.mock("../helpers/battleHelper", () => ({
    default: {
        gameData: {
            gameOver: false,
            info: "Your turn!",
            winner: "",
        },
        resetBattle: vi.fn(),
    },
}));

describe("InfoContainer Component", () => {
    const mockEnemyPokemon = {
        name: "Charizard",
    };
    const mockAllyPokemon = {
        name: "Blastoise",
    };
    const mockSetGameData = vi.fn();
    const mockHandleAttack = vi.fn();

    it("renders game information when the game is not over", () => {
        render(
            <BrowserRouter>
                <InfoContainer
                    enemyPokemon={mockEnemyPokemon}
                    allyPokemon={mockAllyPokemon}
                    setGameData={mockSetGameData}
                    handleAttack={mockHandleAttack}
                />
            </BrowserRouter>
        );

        expect(screen.getByText(/Your Turn!/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Attack/i})).toBeInTheDocument();
    });

    it("calls handleAttack when the Attack button is clicked", () => {
       render(
           <BrowserRouter>
               <InfoContainer
                   enemyPokemon={mockEnemyPokemon}
                   allyPokemon={mockAllyPokemon}
                   setGameData={mockSetGameData}
                   handleAttack={mockHandleAttack}
               />
           </BrowserRouter>
       );

       const attackButton = screen.getByRole("button", { name: /Attack/i });
       fireEvent.click(attackButton);

       expect(mockHandleAttack).toHaveBeenCalled(1);
    });

    it("renders game over message and winner details", () => {
        battleHelper.gameData.winner = "You won!";
        battleHelper.gameData.gameOver = true;
        localStorage.setItem("currentPokemons", "Pikachu,Charizard");

        render(
            <BrowserRouter>
                <InfoContainer
                    enemyPokemon={mockEnemyPokemon}
                    allyPokemon={mockAllyPokemon}
                    setGameData={mockSetGameData}
                    handleAttack={mockHandleAttack}
                />
            </BrowserRouter>
        );

        expect(screen.getByText(/You won!/i)).toBeInTheDocument();
    });

    it("renders 'Go home' button and navigates correctly when clicked", () => {
        battleHelper.gameData.gameOver = true;
        battleHelper.gameData.winner = "You won!";
        localStorage.setItem("currentPokemons", "Pikachu,Charizard");

        render(
            <BrowserRouter>
                <InfoContainer
                    enemyPokemon={mockEnemyPokemon}
                    allyPokemon={mockAllyPokemon}
                    setGameData={mockSetGameData}
                    handleAttack={mockHandleAttack}
                />
            </BrowserRouter>
        );

        const goHomeButton = screen.getByRole("button", { name: /Go home/i });
        expect(goHomeButton).toBeInTheDocument();

        fireEvent.click(goHomeButton);
        expect(battleHelper.resetBattle).toHaveBeenCalledTimes(1);
        expect(mockSetGameData).toHaveBeenCalledWith({ ...battleHelper.gameData });
    });

    it("renders correct message when Pokémon is already in the collection", () => {
        battleHelper.gameData.gameOver = true;
        battleHelper.gameData.winner = "You won!";
        localStorage.setItem("currentPokemons", "Charizard");

        render(
            <BrowserRouter>
                <InfoContainer
                    enemyPokemon={mockEnemyPokemon}
                    allyPokemon={mockAllyPokemon}
                    setGameData={mockSetGameData}
                    handleAttack={mockHandleAttack}
                />
            </BrowserRouter>
        );

        expect(screen.getByText("Charizard is already in your pokemon collection!")).toBeInTheDocument();
    });

    it("renders correct message when Pokémon is added to the collection", () => {
        battleHelper.gameData.gameOver = true;
        battleHelper.gameData.winner = "You won!";
        localStorage.setItem("currentPokemons", "Pikachu");

        render(
            <BrowserRouter>
                <InfoContainer
                    enemyPokemon={mockEnemyPokemon}
                    allyPokemon={mockAllyPokemon}
                    setGameData={mockSetGameData}
                    handleAttack={mockHandleAttack}
                />
            </BrowserRouter>
        );

        expect(screen.getByText("Charizard has been added to your pokemon collection!")).toBeInTheDocument();
    });

    it("renders better luck message when the player loses", () => {
        battleHelper.gameData.gameOver = true;
        battleHelper.gameData.winner = "You lost!";

        render(
            <BrowserRouter>
                <InfoContainer
                    enemyPokemon={mockEnemyPokemon}
                    allyPokemon={mockAllyPokemon}
                    setGameData={mockSetGameData}
                    handleAttack={mockHandleAttack}
                />
            </BrowserRouter>
        );

        expect(screen.getByText("better luck next time!")).toBeInTheDocument();
    });
})
