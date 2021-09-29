import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';
import { FavoritePokemons } from '../components';

describe('Testa se a página de favoritos: ', () => {
  it('Exibe "No favorite pokemon found" caso não haja pokemon favorito', () => {
    render(<FavoritePokemons />);

    const message = screen.getByText(/no favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });

  it('Exibe o pokemon favorito caso haja algum', () => {
    const { history } = renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const checkbox = screen.getByRole('checkbox', { name: /favoritado/i });
    userEvent.click(checkbox);

    history.push('/favorites');
    const pokemon = screen.getByText(/pikachu/i);
    expect(pokemon).toBeInTheDocument();
  });
});
