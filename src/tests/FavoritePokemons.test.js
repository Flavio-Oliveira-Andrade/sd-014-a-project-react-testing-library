import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';
import renderWithRouter from './utils/renderWithRouter';

describe('Testa o component FavoritePokemons', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    render(<FavoritePokemons />);
    const text = screen.getByText(/No favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [pokemons[0]] } />);
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toBeInTheDocument();
  });
});
