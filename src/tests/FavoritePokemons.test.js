import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../utils/renderWithRouter';

import pokemons from '../data';

describe('Testa o componente FavoritePokemons', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found,'
    + ' se a pessoa não tiver pokémons favoritos.', () => {
    render(<FavoritePokemons />);
    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [pokemons[0]] } />);
    const favoritePokemon = screen.getByTestId('pokemon-name');
    expect(favoritePokemon).toBeInTheDocument();
  });
});
