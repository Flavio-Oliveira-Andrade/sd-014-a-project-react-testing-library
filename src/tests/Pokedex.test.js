import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

describe('Testa pokedex', () => {
  test('Heading h2 com "Encountered Pokemons"', () => {
    renderWithRouter(<App />);
    const pokedexHeader = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });

    expect(pokedexHeader).toBeInTheDocument();
  });

  test('Botao proximo pokemon', () => {
    renderWithRouter(<App />);

    const checkPokemons = (nomePokemon) => {
      const botaoProximoPokemon = screen.getByRole('button', {
        name: 'Próximo pokémon',
      });
      userEvent.click(botaoProximoPokemon);
      const pokemonAtual = screen.getByText(nomePokemon);
      expect(pokemonAtual).toBeInTheDocument();
    };

    checkPokemons('Charmander');
    checkPokemons('Caterpie');
    checkPokemons('Ekans');
    checkPokemons('Alakazam');
    checkPokemons('Mew');
    checkPokemons('Rapidash');
    checkPokemons('Snorlax');
    checkPokemons('Dragonair');
    checkPokemons('Pikachu');
  });

  test('Um pokemon por vez ', () => {
    renderWithRouter(<App />);

    const currentPokemon = screen.getAllByTestId('pokemon-name');
    expect(currentPokemon.length).toBe(1);
  });

  test('Filtros na pokedex', () => {
    renderWithRouter(<App />);
    const buttons = 7;
    const pokemonTypeButtons = screen.getAllByTestId('pokemon-type-button');
    const allTypesButton = screen.getByRole('button', {
      name: 'All',
    });

    expect(allTypesButton).toBeInTheDocument();
    expect(pokemonTypeButtons.length).toBe(buttons);
    expect(allTypesButton).toBeEnabled();

    const electricTypeButton = screen.getByRole('button', {
      name: 'Electric',
    });
    userEvent.click(electricTypeButton);
    const nextPokemonButton = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(nextPokemonButton).toBeDisabled();

    userEvent.click(allTypesButton);
    expect(nextPokemonButton).toBeEnabled();
  });
});
