import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Testa o componente Pokedex', () => {
  const testIdPokemon = 'pokemon-name';
  test('Testa se página contém um h2 com Encountered pokémons.', () => {
    renderWithRouter(<App />);

    const encounteredPokemons = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(encounteredPokemons).toBeInTheDocument();
  });
  test('Testa se é exibido o próximo Pokémon da lista'
  + ' quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);

    const getButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(getButton);

    const getNextPokemon = screen.getByTestId(testIdPokemon);
    expect(getNextPokemon.innerHTML).toEqual('Charmander');
  });
  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const getNextPokemon = screen.getAllByTestId(testIdPokemon);
    expect(getNextPokemon).toHaveLength(1);
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    expect(buttonAll).toBeInTheDocument();

    const buttonType = screen.getAllByTestId('pokemon-type-button');

    buttonType.forEach((type, index) => (
      expect(type).not.toEqual(buttonType[index + 1])
    ));
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    expect(buttonAll).toBeInTheDocument();

    userEvent.click(buttonAll);

    const getPokemon = screen.getByTestId(testIdPokemon);
    expect(getPokemon.innerHTML).toEqual('Pikachu');
  });
});
