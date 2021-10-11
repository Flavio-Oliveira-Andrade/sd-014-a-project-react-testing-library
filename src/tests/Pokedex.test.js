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

const filters = pokemons.reduce((acc, { type }) => {
  if (!acc.includes(type)) return [...acc, type];
  return acc;
}, []);

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

  it('should render a filter button for each pokemon type', () => {
    renderWithProps();
    const filterBtns = screen.getAllByTestId('pokemon-type-button');

    expect(filterBtns.length).toBe(filters.length);

    filters.forEach((filter) => {
      const thisFilter = screen.getByRole('button', {
        name: filter,
      });
      expect(thisFilter).toBeInTheDocument();
    });
  });

  filters.forEach((filter) => {
    it(`should render only ${filter} type when filter button is clicked`, () => {
      renderWithProps();
      const thisPokemons = pokemons.filter(({ type }) => type === filter);
      const nextPokemon = screen.getByRole('button', {
        name: /próximo pokémon/i,
      });

      const all = screen.getByRole('button', {
        name: /all/i,
      });
      expect(all).toBeInTheDocument();

      const thisFilter = screen.getByRole('button', {
        name: filter,
      });
      userEvent.click(thisFilter);
      thisPokemons.forEach(() => {
        userEvent.click(nextPokemon);

        const pokemonType = screen.getByTestId('pokemon-type');
        expect(pokemonType).toBeInTheDocument();
        expect(pokemonType.innerHTML).toBe(filter);
      });
    });
  });
});
