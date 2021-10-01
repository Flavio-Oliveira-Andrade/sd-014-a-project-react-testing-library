import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './utils/renderWithRouter';
import pokemons from '../data';

describe('Testando FavoritePokemons', () => {
  test('Exibe na página a mensagem "No favorite pokemon found"', () => {
    render(<FavoritePokemons />);
    const mensage = screen.getByText(/No favorite pokemon found/i);
    expect(mensage).toBeInTheDocument();
  });
  test('Exibe na página os pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [pokemons[0]] } />);
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toBeInTheDocument();
  });
});
