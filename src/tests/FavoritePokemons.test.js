import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('FavoritePokemons.js test', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const favoriteMessage = screen.getByText(/No favorite pokemon found/i);
    expect(favoriteMessage).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {});
  // Ajuda do colega Gustavo Dolzan T14A
  renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
  const pokeCards = screen.getAllByTestId('pokemon-name');
  expect(pokeCards.length).toBe(pokemons.length);
});
