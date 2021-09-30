import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';

import { FavoritePokemons } from '../components';
import App from '../App';

describe('Página Favoritos', () => {
  test('exibe uma mensagem quando não tem pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const message = 'No favorite pokemon found';
    const messageElement = screen.getByText(message);
    expect(messageElement).toBeInTheDocument();
  });

  test('mostra uma lista dos pokémons favoritos', async () => {
    renderWithRouter(<App />);
    // const message = 'No favorite pokemon found';
    const pkmnDetailsLink = screen.getByRole('link', { name: /more details/i });
    const pkmnName = screen.getByTestId('pokemon-name').innerHTML;
    userEvent.click(pkmnDetailsLink);
    const checkFavorite = screen.getByRole('checkbox',
      { name: /pokémon favoritado\?/i });
    userEvent.click(checkFavorite);
    const favoritesLink = screen.getByRole('link', { name: /favorite poké/i });
    userEvent.click(favoritesLink);
    const pkmnNameElement = screen.getByText(pkmnName);
    expect(pkmnNameElement).toBeInTheDocument();
  });
});
