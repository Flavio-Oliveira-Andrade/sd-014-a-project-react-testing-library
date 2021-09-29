import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import renderWithRouter from './utils/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found,'
    + 'se a pessoa não tiver pokémons favoritos.', () => {
    const favoritePokemons = [];
    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemons } />);

    const noFavoriteText = screen.getByText(/No favorite pokemon found/);
    expect(noFavoriteText).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const favoritePokemons = [pokemons[0], pokemons[1]];
    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemons } />);

    const favoritePokemonsNames = screen.getAllByTestId('pokemon-name');
    favoritePokemonsNames.map((pokemonName) => expect(pokemonName).toBeInTheDocument());

    expect(favoritePokemonsNames[0].textContent).toBe('Pikachu');
    expect(favoritePokemonsNames[1].textContent).toBe('Charmander');
  });
});
