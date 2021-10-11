// test('', () => {});
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../services/renderWithRouter';

describe('5- Teste Pokedex.js', () => {
  const POKEMON_TESTID = 'pokemon-name';
  const POKE_TYPES = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
  const DATA_TESTID_TYPE = 'pokemon-type-button';

  beforeEach(() => renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
  ));

  test('Teste se o Header h2 renderiza na tela', () => {
    const heading = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2 });
    expect(heading).toBeInTheDocument();
  });

  test('Teste se ao clicar no Botão o próx Pokemon é mostrado (e apenas 1)', () => {
    pokemons.forEach((pokemon) => {
      const name = screen.getByText(pokemon.name);
      expect(name).toBeInTheDocument();

      const pokemonsArr = screen.getAllByTestId(POKEMON_TESTID);
      expect(pokemonsArr).toHaveLength(1);

      const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
      expect(nextButton).toBeInTheDocument();
      userEvent.click(nextButton);
    });

    const pokemonName = screen.getByText(pokemons[0].name);
    expect(pokemonName).toBeInTheDocument();
  });

  test('Teste se os Botões de filtro renderizam na tela', () => {
    expect(screen.getAllByTestId(DATA_TESTID_TYPE).length).toBe(POKE_TYPES.length);
    screen.getAllByTestId(DATA_TESTID_TYPE).map((buttonType, index) => expect(buttonType)
      .toHaveTextContent(POKE_TYPES[index]));
    expect(screen.getByRole('button', {
      name: /All/i,
    })).toBeInTheDocument();
  });

  test('Teste se o componente renderiza o botão para resetar', () => {
    const resetButton = screen.getByRole('button', { name: /All/i });
    userEvent.click(resetButton);

    const pokemonName = screen.getByTestId(POKEMON_TESTID);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(pokemons[0].name);
  });
});
