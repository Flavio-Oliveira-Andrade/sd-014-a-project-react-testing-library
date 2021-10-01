import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/RenderWithRoute';

import { FavoritePokemons } from '../components';
import App from '../App';

describe('FavoritePokemons.js test', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found'
  + 'se a pessoa não tiver pokémons favoritos. ', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavorites = screen.getByText(/no favorite pokemon found/i, { selector: 'p' });
    expect(noFavorites).toBeInTheDocument();
  });

  test('Testa se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);

    const pokeParagrafInicial = screen.getByTestId(/pokemon-name/i);
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetails);

    const pokemonFavoritado = screen.getByRole('checkbox', {
      name: /pokémon favoritado?/i,
    });
    userEvent.click(pokemonFavoritado);

    const linkFavorites = screen.getByRole('link', {
      name: /favorite Pokémons/i,
    });
    userEvent.click(linkFavorites);
    const pokeParagrafAtual = screen.getByTestId(/pokemon-name/i);
    expect(pokeParagrafInicial.innerHTML).toBe(pokeParagrafAtual.innerHTML);
  });
});
