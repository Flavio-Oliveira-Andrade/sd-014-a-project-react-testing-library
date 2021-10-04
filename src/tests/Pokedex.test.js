import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Testando Pokedex', () => {
  test('Verifica se a página contém um título "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const titlePokedex = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(titlePokedex).toBeInTheDocument();
  });
  test('Verifica se é exibido o próximo pokémon da lista ao clicar'
    + ' no botão "Próximo pokémon"', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByTestId('next-pokemon', {
      name: /próximo pokémon/i,
    });
    expect(buttonNext).toBeInTheDocument();
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon.innerHTML).toBe('Pikachu');
    userEvent.click(buttonNext);
    expect(pokemon.innerHTML).toBe('Charmander');
    userEvent.click(buttonNext);
    expect(pokemon.innerHTML).toBe('Caterpie');
  });
  test('Verifica se é mostrado um pokémon por vez', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(buttonNext).toBeInTheDocument();
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon).toHaveLength(1);
    userEvent.click(buttonNext);
    expect(pokemon).toHaveLength(1);
  });
  test('Verifica se a pokédex tem os botoes de filtro', () => {
    renderWithRouter(<App />);
    const filtersButton = screen.getAllByTestId('pokemon-type-button');

    filtersButton.forEach((btn) => {
      expect(btn).toBeInTheDocument();
    });

    const buttonNext = screen.getByTestId('next-pokemon');
    expect(buttonNext).toBeInTheDocument();

    const pokemonType = screen.getByTestId('pokemon-type');
    const electricButton = screen.getByRole('button', {
      name: /electric/i,
    });
    const buttonFire = screen.getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(electricButton);
    expect(pokemonType.innerHTML).toBe('Electric');
    userEvent.click(buttonFire);
    expect(pokemonType.innerHTML).toBe('Fire');
    userEvent.click(buttonNext);
    expect(pokemonType.innerHTML).toBe('Fire');
    expect(buttonFire.innerHTML).toBe('Fire');
  });
  test('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    expect(buttonAll).toBeInTheDocument();
    const buttonNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(buttonNext).toBeInTheDocument();

    userEvent.click(buttonAll);
    const filterPokemon = screen.getByTestId('pokemon-type');
    expect(filterPokemon.innerHTML).toBe('Electric');
    userEvent.click(buttonNext);
    expect(filterPokemon.innerHTML).toBe('Fire');
  });
});
