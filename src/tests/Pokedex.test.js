import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import Pokedex from '../components/Pokedex';

import renderWithRouter from './renderWithRouter';

import pokemons from '../data';

function checkDuplicateFilters(filters) {
  const filterTable = {};

  const foundDuplicates = filters.some(({ textContent }) => {
    if (filterTable[textContent]) {
      return true;
    }

    filterTable[textContent] = 1;

    return false;
  });

  return foundDuplicates;
}

describe('5 - Teste o Pokedex.js', () => {
  const pokemonNameTestId = 'pokemon-name';
  const nextPokemonTestId = 'next-pokemon';
  const pokemonTypeTestId = 'pokemon-type-button';

  test('5.1 - Testa se página exibe um heading h2 com um texto específico', () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ { 25: true } } />,
    );

    const header = screen.getByRole('heading', { level: 2 });

    expect(header.textContent).toBe('Encountered pokémons');
  });

  test('5.2 Testa se é exibido o próximo Pokémon quando o botão é clicado', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ [pokemons[0], pokemons[1], pokemons[2]] }
        isPokemonFavoriteById={ { 25: true, 4: true, 10: true } }
      />,
    );

    const nextPokemon = screen.getByTestId(nextPokemonTestId);
    expect(nextPokemon.textContent).toBe('Próximo pokémon');

    fireEvent.click(nextPokemon);

    const pokemonName = screen.getByTestId(pokemonNameTestId);

    expect(pokemonName.textContent).toBe('Charmander');

    fireEvent.click(nextPokemon);

    expect(pokemonName.textContent).toBe('Caterpie');

    fireEvent.click(nextPokemon);

    expect(pokemonName.textContent).toBe('Pikachu');
  });

  test('5.3 Testa se é exibido apenas um Pokémon por vez', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ [pokemons[0], pokemons[1], pokemons[2]] }
        isPokemonFavoriteById={ { 25: true, 4: true, 10: true } }
      />,
    );

    const ONE_POKEMON = 1;
    const pokemon = screen.getAllByTestId(pokemonNameTestId);

    expect(pokemon.length).toBe(ONE_POKEMON);
  });

  test('5.4 Testa se a Pokédex  exibe os botões de filtro', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ { 25: true, 4: true, 10: true } }
      />,
    );

    const FILTER_COUNT = 7;
    const filterButtons = screen.getAllByTestId(pokemonTypeTestId);

    expect(filterButtons.length).toBe(FILTER_COUNT);
    expect(checkDuplicateFilters(filterButtons)).toBeFalsy();
  });

  test('5.5 Testa se a Pokédex circula apenas pelos pokemon do tipo selecionado', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ { 25: true, 4: true, 78: true } }
      />,
    );

    const filterButtons = screen.getAllByTestId(pokemonTypeTestId);
    const fireButton = filterButtons[1];

    expect(fireButton.textContent).toBe('Fire');

    const nextPokemon = screen.getByTestId(nextPokemonTestId);

    fireEvent.click(fireButton);

    const pokemonName = screen.getByTestId(pokemonNameTestId);

    expect(pokemonName.textContent).toBe('Charmander');

    fireEvent.click(nextPokemon);

    expect(pokemonName.textContent).toBe('Rapidash');

    fireEvent.click(nextPokemon);

    expect(pokemonName.textContent).toBe('Charmander');
  });

  test('5.6- Testa se a Pokédex exibe o botão para resetar o filtro', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ { 25: true, 4: true, 78: true } }
      />,
    );

    const filterButtons = screen.getAllByTestId(pokemonTypeTestId);
    const fireButton = filterButtons[1];
    const resetFilter = screen.getByText('All');

    const nextPokemon = screen.getByTestId(nextPokemonTestId);

    fireEvent.click(fireButton);

    const pokemonName = screen.getByTestId(pokemonNameTestId);

    expect(pokemonName.textContent).toBe('Charmander');

    fireEvent.click(resetFilter);

    expect(pokemonName.textContent).toBe('Pikachu');

    fireEvent.click(nextPokemon);

    expect(pokemonName.textContent).toBe('Charmander');
  });
});
