import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from './render/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Testes do requisito 3', () => {
  it('se é exibido na tela a mensagem No favorite pokemon found', () => {
    render(<FavoritePokemons />);
    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [pokemons[5]] } />);
    expect(screen.getByText('Mew')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();
  });
});
