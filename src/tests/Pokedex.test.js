import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './utils/renderWithRouter';
import Pokedex from '../components/Pokedex';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  const POKEMON_NAME_TEST_ID = 'pokemon-name';

  test('Teste se página contém um heading h2 com o texto "Encountered pokémons"', () => {
    const isPokemonFavoriteById = { 25: false };
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const headingText = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(headingText).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão'
    + '"Próximo pokémon" é clicado', () => {
    renderWithRouter(<App />);
    const firtPokemonArray = pokemons[0];

    const nextPokemonBtn = screen.getByTestId('next-pokemon');
    expect(nextPokemonBtn).toBeInTheDocument();
    pokemons.forEach((pokemon) => {
      const currentPokemon = screen.getByTestId(POKEMON_NAME_TEST_ID);
      expect(currentPokemon).toBeInTheDocument();
      expect(currentPokemon).toHaveTextContent(pokemon.name);
      userEvent.click(nextPokemonBtn);
    });

    const firstPokemonScreen = screen.getByTestId(POKEMON_NAME_TEST_ID);
    expect(firstPokemonScreen).toBeInTheDocument();
    expect(firstPokemonScreen).toHaveTextContent(firtPokemonArray.name);
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    const allPokemonsOnTheScreen = screen.getAllByTestId(POKEMON_NAME_TEST_ID);
    expect(allPokemonsOnTheScreen).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const types = pokemons.map(({ type }) => type);
    const typesFiltered = types.filter((type, i) => types.indexOf(type) === i);

    const typeBtns = screen.getAllByTestId('pokemon-type-button');
    expect(typeBtns).toHaveLength(typesFiltered.length);

    const nextPokemonBtn = screen.getByTestId('next-pokemon');
    const allBtn = screen.getByRole('button', {
      name: 'All',
    });

    typeBtns.forEach((btn) => {
      expect(allBtn).toBeInTheDocument();
      const btnName = typesFiltered.find((type) => type === btn.textContent);
      expect(btnName).toBeTruthy();

      userEvent.click(btn);

      const filteredPokemons = pokemons.filter(({ type }) => type === btn.textContent);

      if (filteredPokemons.length === 1) {
        expect(nextPokemonBtn).toBeDisabled();
        const currentPokemon = screen.getByTestId(POKEMON_NAME_TEST_ID);
        expect(currentPokemon).toBeInTheDocument();
        expect(currentPokemon).toHaveTextContent(filteredPokemons[0].name);
      } else {
        filteredPokemons.forEach(({ name }) => {
          const currentPokemon = screen.getByTestId(POKEMON_NAME_TEST_ID);
          expect(currentPokemon).toBeInTheDocument();
          expect(currentPokemon).toHaveTextContent(name);
          userEvent.click(nextPokemonBtn);
        });
      }
    });
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const filterByType = (filter) => pokemons.filter((pokemon) => {
      if (filter === 'All') return pokemon;
      return pokemon.type === filter;
    });

    const allBtn = screen.getByRole('button', {
      name: 'All',
    });
    expect(allBtn).toBeInTheDocument();
    let filteredType = allBtn.textContent;

    let filteredPokemons = filterByType(filteredType);

    expect(filteredPokemons).toStrictEqual(pokemons);

    const fireBtn = screen.getByRole('button', {
      name: 'Fire',
    });
    userEvent.click(fireBtn);
    filteredType = fireBtn.textContent;

    filteredPokemons = filterByType(filteredType);

    const firePokemons = pokemons.filter(({ type }) => type === filteredType);
    expect(filteredPokemons).toStrictEqual(firePokemons);

    userEvent.click(allBtn);
    filteredType = allBtn.textContent;

    filteredPokemons = filterByType(filteredType);

    expect(filteredPokemons).toStrictEqual(pokemons);
  });
});
