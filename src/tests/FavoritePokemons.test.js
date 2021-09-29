import { screen } from '@testing-library/react';
import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../services/renderWithRouter';
import data from '../data';

describe('Testa o component FavoritePokemons.js', () => {
  it('Deveria exibir "No favorite pokemon found" se não existirem pokémons favoritos',
    () => {
      renderWithRouter(<FavoritePokemons />);
      const noFavorites = screen.getByText('No favorite pokemon found');
      expect(noFavorites).toBeInTheDocument();
    });
  it('Deveria exibir os pokémons favoritos', () => {
    const snorlaxID = 143;
    const mewID = 151;
    const pokemons = data.filter((pokemon) => pokemon.id === snorlaxID
      || pokemon.id === mewID);
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    expect(screen.getByText('Snorlax')).toBeInTheDocument();
    expect(screen.getByText('Mew')).toBeInTheDocument();
  });
});
