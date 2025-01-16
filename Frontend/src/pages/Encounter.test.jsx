import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Encounter from './Encounter';
import fetchFunctions from "../helpers/fetchFunctions"
import { BrowserRouter } from "react-router-dom";
import { describe, it, vi, expect, beforeEach, beforeAll } from "vitest";

vi.mock("../helpers/fetchFunctions", () => {
    const actual = vi.importActual("../helpers/fetchFunctions");
    return {
        ...actual,
        default: {
            fetchArea: vi.fn(),
            fetchEncounters: vi.fn(),
            chooseRandomPokemon: vi.fn(),
            fetchPokemon: vi.fn(),
        },
    };
});

describe("Encounter Page", () => {
    const mockSetEnemyPokemon = vi.fn();
    const mockSetAllyPokemon = vi.fn();

    beforeEach(() => {

        localStorage.clear();
    });

    it("renders message when no Pokemon is available at location", async () => {
        fetchFunctions.fetchArea.mockResolvedValueOnce({ areas: [] });

        render(
            <BrowserRouter>
                <Encounter encId={1} setEnemyPokemon={mockSetEnemyPokemon} setAllyPokemon={mockSetAllyPokemon} />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/this location doesn't seem to have any pokémon/i)).toBeInTheDocument();
        });

    });

    it("renders a wild Pokemon when found and allows the user to select an ally Pokemon", async () => {
        localStorage.setItem("currentPokemons", "https://pokeapi.co/api/v2/pokemon/bulbasaur");
        fetchFunctions.fetchArea.mockResolvedValueOnce({ areas: [{ url: "area-url" }] });
        fetchFunctions.fetchEncounters.mockResolvedValueOnce({ pokemon_encounters: [{ pokemon: { url: "pokemon-url" } }] });
        fetchFunctions.chooseRandomPokemon.mockReturnValueOnce("pokemon-url");
        fetchFunctions.fetchPokemon.mockResolvedValueOnce({ name: "bulbasaur", sprites: { front_default: "bulbasaur-img-url" } });
        fetchFunctions.fetchPokemon.mockResolvedValueOnce({ name: "pikachu", sprites: { front_default: "pikachu-img-url" } });


        render(
            <BrowserRouter>
                <Encounter encId={1} setEnemyPokemon={mockSetEnemyPokemon} setAllyPokemon={mockSetAllyPokemon} />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/A wild pikachu appeared!/i)).toBeInTheDocument();
            expect(screen.getByAltText(/pikachu/i)).toHaveAttribute("src", "pikachu-img-url");
        });

        const allyPokemon = await screen.findByText(/bulbasaur/i);
        await userEvent.click(allyPokemon);

        expect(mockSetEnemyPokemon).toHaveBeenCalledWith({ name: "pikachu", sprites: { front_default: "pikachu-img-url" } });
        expect(mockSetAllyPokemon).toHaveBeenCalledWith({ name: "bulbasaur", sprites: { front_default: "bulbasaur-img-url" } });
    });
});
