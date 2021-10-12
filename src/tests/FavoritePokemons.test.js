import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from '../rendreWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Testa o componente FavoritePokemons.js', () => {
  it('testa se é exibido na tela a mensagem "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);

    const message = screen.getByText(/No favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });

  it('testa se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [pokemons[0]] } />);

    const favoritePokemon = screen.getByTestId('pokemon-name');
    expect(favoritePokemon).toBeInTheDocument();
  });
});
