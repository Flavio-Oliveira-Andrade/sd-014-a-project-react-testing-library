import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import data from '../data';

import {
  readFavoritePokemonIds,
} from '../services/pokedexService';

const favoritePokemonIds = readFavoritePokemonIds();

const isPokemonFavorite = data.reduce((acc, pokemon) => {
  acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
  return acc;
}, {});

test('Teste o componente <Pokedex.js />', () => {
  renderWithRouter(
    <Pokedex pokemons={ data } isPokemonFavoriteById={ isPokemonFavorite } />,
  );

  expect(
    screen.getByRole('heading', { level: 2 }).textContent,
  ).toBe('Encountered pokémons');

  expect(
    screen.getByText('Pikachu'),
  ).toBeInTheDocument();

  expect(
    screen.getAllByText('Electric'),
  ).toHaveLength(2);

  data.forEach((pokemon) => {
    expect(
      screen.getByText(`${pokemon.name}`),
    ).toBeInTheDocument();

    expect(
      screen.getAllByText(`${pokemon.type}`),
    ).toHaveLength(2);

    expect(
      screen.getAllByText('More details'),
    ).toHaveLength(1);

    expect(
      screen.getByText('All'),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByText('Próximo pokémon'),
    );
  });

  expect(
    screen.getByText('Pikachu'),
  ).toBeInTheDocument();

  expect(
    screen.getAllByText('Electric'),
  ).toHaveLength(2);

  const types = Object.keys(data.reduce((acc, pokemon) => {
    if (!acc[pokemon.type]) acc[pokemon.type] = true;
    return acc;
  }, {}));

  const NEXT_ALL_BTN = 2;

  expect(
    screen.getAllByTestId('pokemon-type-button'),
  ).toHaveLength(types.length);

  expect(
    screen.getAllByRole('button'),
  ).toHaveLength(types.length + NEXT_ALL_BTN);

  expect(
    screen.getByText('All'),
  ).toBeInTheDocument();

  fireEvent.click(
    screen.getByText('All'),
  );

  expect(
    screen.getByText('Pikachu'),
  ).toBeInTheDocument();

  expect(
    screen.getAllByText('Electric'),
  ).toHaveLength(2);
});
