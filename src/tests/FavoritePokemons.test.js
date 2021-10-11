import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

describe('Teste o componente Favorite Pokemons', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [pokemons[0]] } />);
    const pokemonCard = screen.getByTestId('pokemon-name');
    expect(pokemonCard).toBeInTheDocument();
  });
});
// src: https://github.com/tryber/sd-014-a-project-react-testing-library/pull/97
