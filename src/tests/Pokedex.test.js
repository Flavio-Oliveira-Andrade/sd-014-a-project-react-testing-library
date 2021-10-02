import React from 'react';
import { render, screen } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

test('verify correct text for heading', () => {
  render(<Pokedex isPokemonFavoriteById={ {} } pokemons={ pokemons } />);
  const h2 = screen.getByRole('heading');

  expect(h2).toHaveTextContent('Encountered pokémons');
});
