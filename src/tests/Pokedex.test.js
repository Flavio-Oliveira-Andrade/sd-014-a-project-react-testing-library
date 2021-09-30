import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter.test';
import pokemons from '../data';

import App from '../App';

describe('05-Teste o componente Pokedex.js', () => {
  test('se página contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const pokedexTxt = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(pokedexTxt).toBeInTheDocument();
  });

  test('exiba o próximo Pokémon da lista quando botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    const nextPokeBtn = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(nextPokeBtn).toBeInTheDocument();

    const pokemonID = screen.getByTestId('pokemon-name');
    expect(pokemonID).toBeInTheDocument();

    pokemons.map((pokemon, index) => {
      expect(pokemonID).toHaveTextContent(pokemon.name);
      userEvent.click(nextPokeBtn);
      return expect(pokemonID).not.toHaveTextContent(pokemons[index].name);
    });
    pokemons.forEach((pokemon, index) => {
      if (index < pokemons.length - 1) userEvent.click(nextPokeBtn);
    });

    const lastPoke = pokemons[pokemons.length - 1].name;
    expect(pokemonID).toHaveTextContent(lastPoke);

    const firstPoke = pokemons[0].name;
    userEvent.click(nextPokeBtn);
    expect(pokemonID).toHaveTextContent(firstPoke);
  });

  test('se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const showPokemons = screen.getAllByTestId('pokemon-name');
    expect(showPokemons.length).toBe(1);
  });

  test('se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const typesPoke = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const btnType = screen.getAllByTestId('pokemon-type-button');
    expect(btnType.length).toBe(typesPoke.length);

    btnType.map((button, index) => {
      expect(button).toBeInTheDocument();
      return expect(btnType[index]).toHaveTextContent(typesPoke[index]);
    });
    const btnAll = screen.getByRole('button', {
      name: /All/i,
    });
    expect(btnAll).toBeInTheDocument();
  });

  test('se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', {
      name: /All/i,
    });
    const resetFilter = screen.getByText(/pikachu/i);
    userEvent.click(btnAll);
    expect(resetFilter).toBeInTheDocument();
  });
});
