import React from 'react';
import { screen, render } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

const POKEMONS_LENGTH = pokemons.length;

describe('Teste o componente <FavoritePokemons />', () => {
  it('se é exibido "No favorite pokemon found", se não tiver pokémons favoritos.', () => {
    render(<FavoritePokemons pokemons={ [] } />);
    expect(screen.getByText(/no favorite pokemon found/i)).toBeInTheDocument();
  });

  it('se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    expect(screen.getAllByTestId('pokemon-name')).toHaveLength(POKEMONS_LENGTH);
  });
});
