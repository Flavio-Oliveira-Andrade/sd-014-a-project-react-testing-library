import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('FavoritePokemons.js Testes', () => {
  it('Teste se é exibido "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);
    expect((screen.getByText('No favorite pokemon found'))).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [pokemons[0]] } />);
    expect((screen.getByTestId('pokemon-name'))).toBeInTheDocument();
  });
});
