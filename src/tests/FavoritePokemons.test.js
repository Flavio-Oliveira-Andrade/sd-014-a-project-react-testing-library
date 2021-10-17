import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

test('', () => {});

describe('Requisito 3', () => {
  it('É exibido na tela a mensagem No favorite pokemon found', () => {
    render(<FavoritePokemons />);
    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('É exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [pokemons[8]] } />);
    expect(screen.getByText('Dragonair')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();
  });
});
