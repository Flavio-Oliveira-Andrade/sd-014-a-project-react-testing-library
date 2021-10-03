import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('A página contém um heading h2 com o texto Encountered pokémons', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const encouteredPokemonsText = screen.getByRole('heading', {
    name: 'Encountered pokémons',
  });
  expect(encouteredPokemonsText).toBeInTheDocument();
});

test('A página contém um heading h2 com o texto Encountered pokémons', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const encouteredPokemonsText = screen.getByRole('heading', {
    name: 'Encountered pokémons',
  });
  expect(encouteredPokemonsText).toBeInTheDocument();

  const proximoPokemonButton = screen.getByRole('button', {
    name: 'Próximo pokémon',
  });
  expect(proximoPokemonButton).toBeInTheDocument();
  userEvent.click(proximoPokemonButton);
  const pokemoOneName = screen.getByText('Charmander');
  expect(pokemoOneName).toBeInTheDocument();

  userEvent.click(proximoPokemonButton);
  const pokemonTwoName = screen.getByText('Caterpie');
  expect(pokemonTwoName).toBeInTheDocument();

  userEvent.click(proximoPokemonButton);
  const pokemonThreeName = screen.getByText('Ekans');
  expect(pokemonThreeName).toBeInTheDocument();

  userEvent.click(proximoPokemonButton);
  const pokemonFourName = screen.getByText('Alakazam');
  expect(pokemonFourName).toBeInTheDocument();

  userEvent.click(proximoPokemonButton);
  const pokemonFiveName = screen.getByText('Mew');
  expect(pokemonFiveName).toBeInTheDocument();

  userEvent.click(proximoPokemonButton);
  const pokemonSixName = screen.getByText('Rapidash');
  expect(pokemonSixName).toBeInTheDocument();

  userEvent.click(proximoPokemonButton);
  const pokemonSevenxName = screen.getByText('Snorlax');
  expect(pokemonSevenxName).toBeInTheDocument();

  userEvent.click(proximoPokemonButton);
  const pokemonEightName = screen.getByText('Dragonair');
  expect(pokemonEightName).toBeInTheDocument();

  userEvent.click(proximoPokemonButton);
  const pokemonZeroName = screen.getByText('Pikachu');
  expect(pokemonZeroName).toBeInTheDocument();
});

test('É mostrado apenas um Pokémon por vez.', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const pokemonName = screen.getAllByTestId('pokemon-name');
  expect(pokemonName).toHaveLength(1);
});

test('A Pokédex tem os botões de filtro.', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const POKEMON_TYPE_LENGTH = 7;
  const pokemonType = screen.getAllByTestId('pokemon-type-button');
  expect(pokemonType).toHaveLength(POKEMON_TYPE_LENGTH);

  const pokemonTypeFire = screen.getByRole('button', {
    name: 'Fire',
  });
  expect(pokemonTypeFire).toBeInTheDocument();
  userEvent.click(pokemonTypeFire);

  const proximoPokemonButton = screen.getByRole('button', {
    name: 'Próximo pokémon',
  });

  userEvent.click(proximoPokemonButton);
  const pokemenType = screen.getByTestId('pokemon-type', {
    name: 'Fire',
  });
  expect(pokemenType).toBeInTheDocument();

  const allButton = screen.getByRole('button', {
    name: 'All',
  });
  expect(allButton).toBeVisible();
});

test('A Pokédex contém um botão para resetar o filtro', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const firstPokemon = screen.getByTestId('pokemon-name', {
    name: 'pikachu',
  });
  expect(firstPokemon).toBeInTheDocument();

  const allFilterButton = screen.getByRole('button', {
    name: 'All',
  });
  expect(allFilterButton).toBeInTheDocument();
  userEvent.click(allFilterButton);

  expect(firstPokemon).toBeInTheDocument();
});
