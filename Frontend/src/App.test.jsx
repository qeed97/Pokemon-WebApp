import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component', () => {
    it('renders the Location component on the root route', async () => {
        render(
                <App />
        );
        expect(screen.getByText(/Choose a location to find pokemons!/i)).toBeInTheDocument();
    });
});