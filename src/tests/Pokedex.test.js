import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Pokedex component test', () => {
  const POKE_TYPES = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
  const POKE_TESTID = 'pokemon-name';

  test('should contain a heading with the text "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const pokedexHeading = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      value: 2,
    });
    expect(pokedexHeading).toBeInTheDocument();
  });

  test('should go to the next pokemon when the button '
  + '"Próximo pokémon is clicked"', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    pokemons.forEach((pokemon) => {
      const newPokemon = screen.getByTestId(POKE_TESTID);

      expect(newPokemon).toHaveTextContent(pokemon.name);
      userEvent.click(nextButton);
    });
  });

  test('should show only one pokemon at time', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getAllByTestId(POKE_TESTID);
    expect(pokemon).toHaveLength(1);
  });

  test('should have filter buttons', () => {
    renderWithRouter(<App />);

    POKE_TYPES.forEach((type) => {
      const typeButton = screen.getByRole('button', {
        name: type,
      });
      expect(typeButton).toBeInTheDocument();
    });
  });

  test('should cycle through the pokemon of that type '
  + 'if filter button is clicked', () => {
    renderWithRouter(<App />);

    const pokemonTypeButtons = screen.getAllByTestId('pokemon-type-button');
    const pokemonType = screen.getByTestId('pokemon-type');

    pokemonTypeButtons.forEach((button, index) => {
      userEvent.click(pokemonTypeButtons[index]);

      const typeButton = button.innerHTML;
      const type = pokemonType.innerHTML;
      expect(type).toBe(typeButton);
    });
  });

  test('should have buttons to reset filter', () => {
    renderWithRouter(<App />);
    // o botão reset é o botão que mostra todos os tipos
    const resetButton = screen.getByRole('button', {
      name: /all/i,
    });
    expect(resetButton).toBeInTheDocument();
    userEvent.click(resetButton);

    const displayedPokemon = screen.getByTestId(POKE_TESTID);
    expect(displayedPokemon).toBeInTheDocument();
    expect(displayedPokemon).toHaveTextContent(pokemons[0].name);
  });
});
