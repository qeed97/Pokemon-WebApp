import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { describe, it, vi, expect, beforeEach, beforeAll } from 'vitest';
import Locations from './Locations';
import { BrowserRouter } from "react-router-dom";

describe('Locations Page', () => {
    const mockSetEncId = vi.fn();

    beforeAll(() => {
        vi.spyOn(console, 'log').mockImplementation(() => {});
    });

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the locations page with header and instructions', () => {
        render(
            <BrowserRouter>
                <Locations />
            </BrowserRouter>
        );

        expect(screen.getByText(/Locations/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Choose a location to find pokemons!/i)
        ).toBeInTheDocument();
    });

    it('fetches and displays locations', async () => {
        const mockLocations = {
            results: [
                {name: 'canalave-city'},
                {name: 'eterna-city'},
            ],
        };

        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockLocations),
            })
        );

        render(
            <BrowserRouter>
                <Locations setEncId={mockSetEncId} />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/canalave city/i)).toBeInTheDocument();
            expect(screen.getByText(/eterna city/i)).toBeInTheDocument();
        });
    });

    it('navigates to the encounter page when a locations is clicked', async () => {
       const mockLocations = {
           results: [
               {name: 'canalave-city'},
               {name: 'eterna-city'},
           ],
       };

       global.fetch = vi.fn(() =>
           Promise.resolve({
               json: () => Promise.resolve(mockLocations),
           })
       );

       render(
           <BrowserRouter>
               <Locations setEncId={mockSetEncId} />
           </BrowserRouter>
       );

       await waitFor(() => {
           expect(screen.getByText(/canalave city/i)).toBeInTheDocument();
       });

       const firstLocation = screen.getByText(/canalave city/i);
       await userEvent.click(firstLocation);

       expect(mockSetEncId).toHaveBeenCalledWith(1);
    });

    it('handles fetch errors gracefully', async () => {
        global.fetch = vi.fn(() => Promise.reject('API error'));

        render(
            <BrowserRouter>
                <Locations setEncId={mockSetEncId} />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(console.log).toHaveBeenCalledWith('API error');
        });
    });
});