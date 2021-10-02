import { render, screen } from '@testing-library/react';
import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

test('verify no favorites message', () => {
  render(<FavoritePokemons />);
  const message = screen.getByText('No favorite pokemon found');

  expect(message).toBeInTheDocument();
});

test('verify poke cards exibition', () => {
  renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
  const pika = screen.getByText('Pikachu');
  const mew = screen.getByText('Mew');

  expect(pika).toBeInTheDocument();
  expect(mew).toBeInTheDocument();
});
