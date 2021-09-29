import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

const pokemon = data[0];
const NUM_OF_IMG = 3;

test('Teste o componente <PokemonDetails.js />', () => {
  renderWithRouter(<App />);

  fireEvent.click(
    screen.getByText('More details'),
  );

  expect(
    screen.getByText(`${pokemon.name}`),
  ).toBeInTheDocument();

  expect(
    screen.getAllByRole('heading', { level: 2 })[0].textContent,
  ).toBe(`${pokemon.name} Details`);

  expect(
    screen.queryByText('More details'),
  ).not.toBeInTheDocument();

  expect(
    screen.getAllByRole('heading', { level: 2 })[1].textContent,
  ).toBe('Summary');

  expect(
    screen.getByText(`${pokemon.summary}`),
  ).toBeInTheDocument();

  expect(
    screen.getAllByRole('heading', { level: 2 })[2].textContent,
  ).toBe(`Game Locations of ${pokemon.name}`);

  pokemon.foundAt.forEach((place, i) => {
    expect(
      screen.getByText(place.location),
    ).toBeInTheDocument();

    expect(
      screen.getAllByAltText(`${pokemon.name} location`)[i].src,
    ).toBe(place.map);
  });

  expect(
    screen.getAllByAltText(`${pokemon.name} location`),
  ).toHaveLength(pokemon.foundAt.length);

  fireEvent.click(
    screen.getByText('Pokémon favoritado?'),
  );

  expect(
    screen.getAllByRole('img'),
  ).toHaveLength(NUM_OF_IMG + 1);

  fireEvent.click(
    screen.getByText('Pokémon favoritado?'),
  );

  expect(
    screen.getAllByRole('img'),
  ).toHaveLength(NUM_OF_IMG);
});
