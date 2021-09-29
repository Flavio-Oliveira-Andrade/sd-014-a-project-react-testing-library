import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import pokemons from '../data';

const pokeName = 'pokemon-name';

test('if the page contains a heading h2 with the text "Encountered pokemons"', () => {
  renderWithRouter(<App />);
  const textEnconteredPokes = screen.getByRole('heading', {
    name: /Encountered pokémons/i,
  });
  expect(textEnconteredPokes).toBeInTheDocument();
});

test('if shows the next pokémon, by clicking on the "Próximo Pokémon"', () => {
  renderWithRouter(<App />);

  const nextName = 'Próximo pokémon';
  const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
  const pokemonName = screen.getByTestId(pokeName);

  fireEvent.click(nextButton);

  expect(nextButton.textContent).toBe(nextName);
  expect(pokemonName.textContent).toBe('Charmander');

  fireEvent.click(nextButton);

  expect(pokemonName.textContent).toBe('Caterpie');
});

test('if shows one pokémon at a time', () => {
  renderWithRouter(<App />);
  const pokemon = screen.getAllByTestId(pokeName);

  expect(pokemon.length).toBe(1);
});

test('if has filter buttons', () => {
  renderWithRouter(<App />);
  const typeButtons = screen.getAllByTestId('pokemon-type-button');
  const pokemonsTypes = [
    'Electric',
    'Fire',
    'Bug',
    'Poison',
    'Psychic',
    'Normal',
    'Dragon',
  ];

  typeButtons.forEach((button, index) => {
    expect(button.textContent).toBe(pokemonsTypes[index]);
  });
});

test('if filter after clicking on a type button', () => {
  renderWithRouter(<App />);

  pokemons.forEach((pokemon) => {
    const { type } = pokemon;
    const filterButton = screen.getByRole('button', { name: type });

    fireEvent.click(filterButton);

    const currentPokemon = screen.getByTestId('pokemon-type');
    expect(currentPokemon).toHaveTextContent(type);
  });
});

test('if has a reset filter button', () => {
  renderWithRouter(<App />);
  const resetButton = screen.getByRole('button', { name: 'All' });

  fireEvent.click(resetButton);
  const currentPokemon = screen.getByTestId('pokemon-name');

  expect(resetButton).toBeInTheDocument();
  expect(currentPokemon.textContent).toBe('Pikachu');
});
