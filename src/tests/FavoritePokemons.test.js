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
    const testIdName = screen.getByTestId('pokemon-name');
    const typePoke = screen.getByText('Bug');
    const testIdType = screen.getByTestId('pokemon-type');
    const altImage = screen.getByAltText('Caterpie sprite');
    const url = 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png';
    expect(namePoke).toBeInTheDocument();
    expect(testIdName).toBeInTheDocument();
    expect(typePoke).toBeInTheDocument();
    expect(testIdType).toBeInTheDocument();
    expect(altImage).toHaveAttribute('src',url);
  });
});
