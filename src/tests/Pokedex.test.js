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
});
