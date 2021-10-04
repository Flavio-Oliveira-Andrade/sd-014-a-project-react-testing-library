import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Test Pokedex component', () => {
  const POKEMON_NAME_TEST_ID = 'pokemon-name';

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

    pokemons.forEach(({ name }) => {
      const pokemonName = screen.getByTestId(POKEMON_NAME_TEST_ID);
      expect(pokemonName).toBeInTheDocument();
      expect(pokemonName).toHaveTextContent(name);
      userEvent.click(nextPokemonButton);
    });

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
});
