import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Tests the Pokedex component', () => {
  it('should render a heading with the appropriate text', () => {
    const isFavoriteObj = {};
    pokemons.forEach(({ id }) => {
      isFavoriteObj[id] = false;
    });
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavoriteObj }
    />);

    const pokedexHeading = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(pokedexHeading).toBeInTheDocument();
  });
});
