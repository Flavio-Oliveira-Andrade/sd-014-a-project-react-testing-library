import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import pokemons from '../data';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';

describe('5. Teste o componente <Pokedex.js />', () => {
  const POKEMON_TESTID = 'pokemon-name';

  beforeEach(() => renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
  ));

  test('A página contém um heading h2 com o texto Encountered pokémons', () => {
    const h2 = screen.getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });

  test('É exibido um Pokémon por vez, e o próximo ao clicar o botão Próx.pokémon', () => {
    pokemons.forEach((pokemon) => {
      const text = screen.getByText(pokemon.name);
      expect(text).toBeInTheDocument();

      const arrayPokemons = screen.getAllByTestId(POKEMON_TESTID);
      expect(arrayPokemons).toHaveLength(1);

      const button = screen.getByRole('button', { name: /Próximo pokémon/i });
      expect(button).toBeInTheDocument();
      userEvent.click(button);
    });

    const pokemonName = screen.getByText(pokemons[0].name);
    expect(pokemonName).toBeInTheDocument();
  });

  test('A Pokédex tem os botões de filtro', () => {
    const buttonLabels = [...new Set(pokemons.reduce(
      (types, { type }) => [...types, type], [],
    ))];
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons).toHaveLength(buttonLabels.length);

    buttonLabels.forEach((buttonLabel) => {
      const button = screen.getByRole('button', { name: new RegExp(buttonLabel, 'i') });
      expect(button).toBeInTheDocument();
    });
  });

  test('A Pokédex contém um botão para resetar o filtro', () => {
    const button = screen.getByRole('button', { name: /All/i });
    userEvent.click(button);

    const pokemonName = screen.getByTestId(POKEMON_TESTID);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(pokemons[0].name);
  });

});
