import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './Utilis/renderWithRouter';

describe('Teste o componente "F"avoritePokemons"', () => {
  test('Teste se é exibido na tela a mensagem "No favorite pokemon found"'
    + ', se a pessoa não tiver pokémons favoritos.', () => {
    render(<FavoritePokemons />);

    const noFavoritePokemon = screen.getByText(/No favorite pokemon found/);
    expect(noFavoritePokemon).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);

    const pokemonDetail = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(pokemonDetail);

    const checkedFavorite = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });

    userEvent.click(checkedFavorite);

    history.push('/favorites');

    const inputFavoritePage = screen.getByText('Pikachu');
    expect(inputFavoritePage).toBeInTheDocument();
  });
});
