import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Test <Pokedex.js /> component', () => {
  it('should contain a heading (h2) with the following text: '
      + '"Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const encounteredPokemons = screen.getByRole('heading',
      { name: /Encountered pokémons/i,
        level: 2,
      });

    expect(encounteredPokemons).toBeInTheDocument();
  });

  it('should show only the next pokémon when the button is clicked', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);

    pokemons.forEach((pokemon) => {
      const nextPokemonButton = screen.getByRole('button',
        { name: /Próximo pokémon/i });
      const pokemonName = screen.getByText(pokemon.name);
      const pokemonsBeingShown = screen.getAllByTestId('pokemon-name');

      expect(pokemonName).toBeInTheDocument();
      expect(pokemonsBeingShown).toHaveLength(1);
      expect(nextPokemonButton).toBeInTheDocument();

      userEvent.click(nextPokemonButton);
    });

    const firstPokemon = screen.getByText(pokemons[0].name);

    expect(firstPokemon).toBeInTheDocument();
  });

  it('should have filter buttons', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);

    const pokemonTypes = [...new Set(
      pokemons.reduce((types, { type }) => [...types, type], []),
    )];
    const typeButtons = screen.getAllByTestId('pokemon-type-button');

    expect(typeButtons).toHaveLength(pokemonTypes.length);

    pokemonTypes.forEach((pokemonType) => {
      const button = screen.getByRole('button',
        { name: pokemonType });

      expect(button).toBeInTheDocument();
    });
  });

  it('should have a button to reset the filter', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);

    const resetButton = screen.getByRole('button',
      { name: /All/i });

    userEvent.click(resetButton);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();

    expect(pokemonName).toHaveTextContent(pokemons[0].name);
    expect(pokemonType).toHaveTextContent(pokemons[0].type);
    expect(pokemonWeight).toHaveTextContent(pokemons[0].averageWeight.value);
    expect(pokemonWeight).toHaveTextContent(pokemons[0].averageWeight.measurementUnit);
  });
});
