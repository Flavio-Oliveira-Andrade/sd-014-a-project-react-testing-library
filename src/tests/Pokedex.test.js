import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import pokeProps from './mocks/pokeMocks';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../utils/renderWithRouter';

describe('Componente Pokedex', () => {
  const TEST_ID_NAME = 'pokemon-name';
  const TEST_ID_TYPE = 'pokemon-type';
  const TEST_ID_TYPE_BTN = 'pokemon-type-button';
  const NEXT_BTN_NAME = 'Próximo pokémon';

  test('renderiza o heading com o texto "Encountered pokémons"', () => {
    renderWithRouter(<Pokedex { ...pokeProps } />);

    const heading = screen.getByRole('heading',
      { level: 2, name: 'Encountered pokémons' });
    expect(heading).toBeInTheDocument();
  });

  test('mostra o próximo Pokémon ao clicar no botão "Próximo"', () => {
    renderWithRouter(<Pokedex { ...pokeProps } />);
    const nextPkmnButton = screen.getByRole('button', { name: NEXT_BTN_NAME });

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

    const typeButtons = screen.getAllByTestId(TEST_ID_TYPE_BTN);
    expect(typeButtons.length).toBe(2);
    expect(typeButtons[0].innerHTML).toBe('Electric');
    expect(typeButtons[1].innerHTML).toBe('Fire');
  });

  test('ao clicar em um botão de tipo, mostra apenas pokémons do tipo', () => {
    renderWithRouter(<Pokedex { ...pokeProps } />);
    const allButton = screen.getByRole('button', { name: /all/i });
    const typeButtons = screen.getAllByTestId(TEST_ID_TYPE_BTN);
    let pkmnType = screen.getByTestId(TEST_ID_TYPE).innerHTML;

    expect(pkmnType).toBe(typeButtons[0].innerHTML);
    userEvent.click(typeButtons[1]);

    pkmnType = screen.getByTestId(TEST_ID_TYPE).innerHTML;
    expect(pkmnType).toBe(typeButtons[1].innerHTML);
    expect(allButton).toBeInTheDocument();

    const nextPkmnButton = screen.getByRole('button', { name: NEXT_BTN_NAME });

    // changing some times the pokémon to make sure
    userEvent.click(nextPkmnButton);
    userEvent.click(nextPkmnButton);
    userEvent.click(nextPkmnButton);
    expect(allButton).toBeInTheDocument();

    pkmnType = screen.getByTestId(TEST_ID_TYPE).innerHTML;
    expect(pkmnType).toBe(typeButtons[1].innerHTML);

    userEvent.click(typeButtons[0]);
    pkmnType = screen.getByTestId(TEST_ID_TYPE).innerHTML;
    expect(pkmnType).toBe(typeButtons[0].innerHTML);
    expect(allButton).toBeInTheDocument();
  });

  test('ao clicar no botão all, reseta o filtro selecionado', () => {
    renderWithRouter(<Pokedex { ...pokeProps } />);
    const allButton = screen.getByRole('button', { name: /all/i });
    const typeButtons = screen.getAllByTestId(TEST_ID_TYPE_BTN);
    const initialType = screen.getByTestId(TEST_ID_TYPE).innerHTML;

    userEvent.click(typeButtons[1]);
    userEvent.click(allButton);

    let pkmnType = screen.getByTestId(TEST_ID_TYPE).innerHTML;
    expect(pkmnType).toBe(initialType);

    const nextPkmnButton = screen.getByRole('button', { name: NEXT_BTN_NAME });
    userEvent.click(nextPkmnButton);
    pkmnType = screen.getByTestId(TEST_ID_TYPE).innerHTML;
    expect(pkmnType).not.toBe(initialType);
  });
});
