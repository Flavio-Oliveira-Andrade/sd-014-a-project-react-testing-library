import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './Util/RenderWithRouter';
import App from '../App';

describe('Verifica o component Pokedex', () => {
  it('Verifica se a página contém um heading "h2"', () => {
    renderWithRouter(<App />);

    const pokedexText = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(pokedexText).toBeInTheDocument();
  });

  it('Verifica o próximo pokémon da lista é exibido ao clicar no botão', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(nextButton).toBeInTheDocument();
  });

  it('Verifica se é mostrado um pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemonsIds = screen.getAllByTestId('pokemon-name');
    expect(pokemonsIds).toHaveLength(1); // https://jestjs.io/pt-BR/docs/expect#tohavelengthnumber
  });

  it('Verifca se a Pokédex tem botões de filtro', () => {
    renderWithRouter(<App />);

    const btnClassFilter = screen.getAllByTestId('pokemon-type-button');
    const btnLength = btnClassFilter.length > 0;
    expect(btnLength).toBe(true);
  });

  it('Verifica se os filtros seleção os Pokémons por tipo', () => {
    renderWithRouter(<App />);

    const btnType = screen.getByRole('button', {
      name: /dragon/i,
    });

    userEvent.click(btnType);

    const pokemonType = screen.getByTestId('pokemon-type');

    expect(pokemonType.innerHTML).toEqual('Dragon');
  });

  it('Verifica se a Pokédex tem um botão para resetar os filtros', () => {
    renderWithRouter(<App />);

    const btnResetFilter = screen.getByRole('button', {
      name: /all/i,
    });
    expect(btnResetFilter).toBeInTheDocument();

    userEvent.click(btnResetFilter);
  });
});
