import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../support/renderWithRouter';
import { DATA_TESTID, DATA_TESTID_TYPE, POKE_TYPES } from '../support/noMagicStuff';
import App from '../App';
import pokemons from '../data';

describe('Tests the POKEDEX component', () => {
  beforeEach(() => { renderWithRouter(<App />); });
  it('should have the Heading with the text Encountered pokémons.', () => {
    expect(screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    })).toBeInTheDocument();
  });
  it('should go to the next pokemon when the button is clicked', () => {
    const nextPokemonButton = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    const pokemonId = screen.getByTestId(DATA_TESTID);
    expect(nextPokemonButton).toBeInTheDocument();
    pokemons.map((pokemon, index) => {
      expect(pokemonId).toHaveTextContent(pokemon.name);
      fireEvent.click(nextPokemonButton);
      return expect(pokemonId).not.toHaveTextContent(pokemons[index].name);
    });
    pokemons.forEach((_, index) => {
      if (index < pokemons.length - 1) fireEvent.click(nextPokemonButton);
    });
    expect(pokemonId).toHaveTextContent(pokemons[pokemons.length - 1].name);
    fireEvent.click(nextPokemonButton);
    expect(pokemonId).toHaveTextContent(pokemons[0].name);
  });

  it('should render only one pokemon at a time', () => {
    expect((screen.getAllByTestId(DATA_TESTID)).length).toBe(1);
  });

  it('should verify if Pokedex has filter buttons', () => {
    expect(screen.getAllByTestId(DATA_TESTID_TYPE).length).toBe(POKE_TYPES.length);
    screen.getAllByTestId(DATA_TESTID_TYPE).map((buttonType, index) => expect(buttonType)
      .toHaveTextContent(POKE_TYPES[index]));
    expect(screen.getByRole('button', {
      name: /All/i,
    })).toBeInTheDocument();
  });

  it('should have a button to clean filters', () => {
    const buttonAllPokemons = screen.getByRole('button', {
      name: /All/i,
    });
    expect(buttonAllPokemons).toBeInTheDocument();
    fireEvent.click(buttonAllPokemons);
    pokemons.forEach((_, index) => {
      expect(screen.getByTestId(DATA_TESTID)).toHaveTextContent(pokemons[index].name);
      fireEvent.click(screen.getByRole('button', {
        name: /Próximo pokémon/i,
      }));
      expect(buttonAllPokemons).toBeInTheDocument();
    });
  });
});
