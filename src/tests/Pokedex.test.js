import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Test Pokedex component', () => {
  const POKEMON_NAME_TEST_ID = 'pokemon-name';

  // Function to iterate over the pokemons array
  function iteratePokemons(pokemonsToIterate, nextPokemonButton) {
    pokemonsToIterate.forEach(({ name }) => {
      const pokemonName = screen.getByTestId(POKEMON_NAME_TEST_ID);
      expect(pokemonName).toBeInTheDocument();
      expect(pokemonName).toHaveTextContent(name);
      userEvent.click(nextPokemonButton);
    });
  }

  it('contains a heading with the text "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(heading).toBeInTheDocument();
  });

  it('displays the next Pokémon in the list when the button is clicked', () => {
    renderWithRouter(<App />);
    const nextPokemonButton = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(nextPokemonButton).toBeInTheDocument();

    iteratePokemons(pokemons, nextPokemonButton);

    // Displays the first Pokémon again
    const firstPokemonName = screen.getByTestId(POKEMON_NAME_TEST_ID);
    expect(firstPokemonName).toBeInTheDocument();
    expect(firstPokemonName).toHaveTextContent(pokemons[0].name);
  });

  it('shows only one Pokémon at a time', () => {
    renderWithRouter(<App />);
    const pokemonList = screen.getAllByTestId(POKEMON_NAME_TEST_ID);
    expect(pokemonList).toHaveLength(1);
  });

  it('has filter buttons', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();

    const nextPokemonButton = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(nextPokemonButton).toBeInTheDocument();

    // Create an array with the names of the types
    const types = pokemons.reduce(
      (acc, { type }) => (acc.includes(type) ? acc : [...acc, type]),
      [],
    );

    types.forEach((type) => {
      const button = screen.getByRole('button', { name: type });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(type);

      // Click on the button to filter the pokemons
      userEvent.click(button);

      // Filter pokemons by type
      const filteredPokemons = pokemons.filter(
        (pokemon) => pokemon.type === type,
      );

      // If there is only one Pokémon, the button is disabled
      if (filteredPokemons.length === 1) {
        expect(nextPokemonButton).toBeDisabled();
      } else {
        iteratePokemons(filteredPokemons, nextPokemonButton);
      }

      // Button All is always visible
      expect(buttonAll).toBeInTheDocument();
    });
  });
});
