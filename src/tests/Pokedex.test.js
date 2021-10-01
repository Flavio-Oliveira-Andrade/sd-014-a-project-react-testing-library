import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import pokeProps from './mocks/pokeMocks';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../utils/renderWithRouter';

describe('Página Pokedex', () => {
  test('renderiza o heading com o texto "Encountered pokémons"', () => {
    renderWithRouter(<Pokedex { ...pokeProps } />);

    const heading = screen.getByRole('heading',
      { level: 2, name: 'Encountered pokémons' });
    expect(heading).toBeInTheDocument();
  });

  test('mostra o próximo Pokémon ao clicar no botão "Próximo"', () => {
    renderWithRouter(<Pokedex { ...pokeProps } />);
    const TEST_ID_NAME = 'pokemon-name';
    const nextPkmnButton = screen.getByRole('button', { name: 'Próximo pokémon' });

    const pkmnName = screen.getByTestId(TEST_ID_NAME).innerHTML;
    expect(pkmnName).toBe(pokeProps.pokemons[0].name);

    userEvent.click(nextPkmnButton);
    const pkmnName2 = screen.getByTestId(TEST_ID_NAME).innerHTML;
    expect(pkmnName2).toBe(pokeProps.pokemons[1].name);

    userEvent.click(nextPkmnButton);
    const pkmnName3 = screen.getByTestId(TEST_ID_NAME).innerHTML;
    expect(pkmnName3).toBe(pokeProps.pokemons[2].name);

    userEvent.click(nextPkmnButton);
    const pkmnName4 = screen.getByTestId(TEST_ID_NAME).innerHTML;
    expect(pkmnName4).toBe(pokeProps.pokemons[0].name);
  });

  test('renderiza botões de filtro por tipo', () => {
    renderWithRouter(<Pokedex { ...pokeProps } />);

    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(typeButtons.length).toBe(2);
    expect(typeButtons[0].innerHTML).toBe('Electric');
    expect(typeButtons[1].innerHTML).toBe('Fire');
  });

  test('ao clicar em um botão de tipo, mostra apenas pokémons do tipo', () => {
    renderWithRouter(<Pokedex { ...pokeProps } />);
    const TEST_ID_TYPE = 'pokemon-type';

    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    userEvent.click(typeButtons[1]);

    let pkmnType = screen.getByTestId(TEST_ID_TYPE).innerHTML;
    expect(pkmnType).toBe(typeButtons[1].innerHTML);

    const nextPkmnButton = screen.getByRole('button', { name: 'Próximo pokémon' });

    // changing some times the pokémon to make sure
    userEvent.click(nextPkmnButton);
    userEvent.click(nextPkmnButton);
    userEvent.click(nextPkmnButton);

    pkmnType = screen.getByTestId(TEST_ID_TYPE).innerHTML;
    expect(pkmnType).toBe(typeButtons[1].innerHTML);

    userEvent.click(typeButtons[0]);
    pkmnType = screen.getByTestId(TEST_ID_TYPE).innerHTML;
    expect(pkmnType).toBe(typeButtons[0].innerHTML);
  });
});
