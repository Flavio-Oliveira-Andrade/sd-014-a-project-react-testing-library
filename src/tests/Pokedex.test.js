import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const renderWithProps = () => {
  const isFavoriteObj = {};
  pokemons.forEach(({ id }) => {
    isFavoriteObj[id] = false;
  });
  return renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isFavoriteObj }
  />);
};

describe('Tests the Pokedex component', () => {
  it('should render a heading with the appropriate text', () => {
    renderWithProps();

    const pokedexHeading = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(pokedexHeading).toBeInTheDocument();
  });

  it('should render the next pokemon when the button is clicked', () => {
    renderWithProps();

    const nextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(nextPokemon).toBeInTheDocument();

    pokemons.forEach(({ name }) => {
      const thisPokemon = screen.getByText(name);
      expect(thisPokemon).toBeInTheDocument();
      userEvent.click(nextPokemon);
      expect(thisPokemon.innerHTML).not.toBe(name);
    });
  });
});
