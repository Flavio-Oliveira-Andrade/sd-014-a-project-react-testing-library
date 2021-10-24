import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './utilitary/renderWithRouter';
import App from '../App';
import pokemons from '../data';
import { NAME_INFO, TYPE_BUTTON, POKE_TYPES } from './utilitary/antiMagicError';

describe('Tests Pokédex component', () => {
  beforeEach(() => { renderWithRouter(<App />); });
  it('should render Encountered Pokémons <h2>', () => {
    expect(screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    })).toBeInTheDocument();
  });

  it('should redirects to the next pokemon', () => {
    const nextPokemonBtn = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    const nameId = screen.getByTestId(NAME_INFO);
    expect(nextPokemonBtn).toBeInTheDocument();
    pokemons.map((pokemon, index) => {
      expect(nameId).toHaveTextContent(pokemon.name);
      fireEvent.click(nextPokemonBtn);
      return expect(nameId).not.toHaveTextContent(pokemons[index].name);
    });
    pokemons.forEach((_, index) => {
      if (index < pokemons.length - 1) fireEvent.click(nextPokemonBtn);
    });
    expect(nameId).toHaveTextContent(pokemons[pokemons.length - 1].name);
    fireEvent.click(nextPokemonBtn);
    expect(nameId).toHaveTextContent(pokemons[0].name);
  });

  it('should render only 1 pokémon', () => {
    expect((screen.getAllByTestId(NAME_INFO).length)).toBe(1);
  });

  it('should have functional filter buttons', () => {
    expect(screen.getAllByTestId(TYPE_BUTTON).length).toBe(POKE_TYPES.length);
    screen.getAllByTestId(TYPE_BUTTON).map((buttonType, index) => expect(buttonType)
      .toHaveTextContent(POKE_TYPES[index]));
    expect(screen.getByRole('button', {
      name: /All/i,
    })).toBeInTheDocument();
  });

  it('should have a functional button to clean filters', () => {
    const allPokeBtn = screen.getByRole('button', {
      name: /All/i,
    });
    expect(allPokeBtn).toBeInTheDocument();
    fireEvent.click(allPokeBtn);
    pokemons.forEach((_, index) => {
      expect(screen.getByTestId(NAME_INFO)).toHaveTextContent(pokemons[index].name);
      fireEvent.click(screen.getByRole('button', {
        name: /Próximo pokémon/i,
      }));
      expect(allPokeBtn).toBeInTheDocument();
    });
  });
});
