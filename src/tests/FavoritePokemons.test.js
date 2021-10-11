import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from './helper/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('FavoritePokemons component test', () => {
  test('should display the message "No favorite pokemon found" '
  + 'if theres no favorite pokemon', () => {
    renderWithRouter(<FavoritePokemons />);

    const favNotFound = screen.getByText(/no favorite pokemon/i);
    expect(favNotFound).toBeInTheDocument();
  });

  test('should render all favorite pokemons', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();

    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();

    const mew = screen.getByText('Mew');
    expect(mew).toBeInTheDocument();
  });
});
