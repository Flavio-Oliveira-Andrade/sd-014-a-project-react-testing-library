import React from 'react';
import { screen, render } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Teste o componente FavoritePokemons', () => {
  it('Teste se é exibido No favorite pokemon found,'
  + 'se a pessoa não tiver pokémons favoritos', () => {
    render(<FavoritePokemons />);
    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [pokemons[2]] } />);
    const namePoke = screen.getByText('Caterpie');
    const testId = screen.getByTestId('pokemon-name');
    expect(namePoke).toBeInTheDocument();
    expect(testId).toBeInTheDocument();
  });
});
