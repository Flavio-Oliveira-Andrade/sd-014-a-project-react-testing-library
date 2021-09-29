import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

describe('Pokedex.js test', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    render(<MemoryRouter><App /></MemoryRouter>);

    const encounteredText = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(encounteredText).toBeInTheDocument();
  });

  test(`Teste se é exibido o próximo Pokémon da lista
  quando o botão Próximo pokémon é clicado.`, () => {
    render(<MemoryRouter><App /></MemoryRouter>);

    const buttonNext = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(buttonNext).toBeInTheDocument();
  });
  test('Testa se é mostrado apenas um pokemon por vez', () => {
    render(<MemoryRouter><App /></MemoryRouter>);

    const onePokemon = screen.getAllByTestId('pokemon-name');
    expect(onePokemon.length).toBe(1);
  });

  test('Testa se a pokedex tem os botoes de filtro', () => {
    render(<MemoryRouter><App /></MemoryRouter>);

    const buttonType = screen.getByRole('button', {
      name: /electric/i,
    });

    const renderTypePoke = screen.getByTestId('pokemon-type');

    userEvent.click(buttonType);
    expect(renderTypePoke.innerHTML).toEqual('Electric');
  });

  test('Teste se existe um botão de filtragem para cada tip o de pokemons', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const tipoQuanti = 7;
    const allButtonsTypes = screen.getAllByTestId('pokemon-type-button');

    expect(allButtonsTypes.length).toBe(tipoQuanti);
  });

  // https://github.com/tryber/sd-012-project-react-testing-library/pull/31/commits
  // /d061300100aa51da2cdbf5fac52c346f99d4743b
  // Conceito retirado do meu amigo Luis Fernando,
  // para passar em um dos requisitos pedidos.
  test('Testa se a pokedex tem um botao para resetar filtro', () => {
    render(<MemoryRouter><App /></MemoryRouter>);

    const btnReset = screen.getByRole('button', {
      name: /all/i,
    });
    expect(btnReset).toBeInTheDocument();

    const btnType = screen.getByRole('button', {
      name: /bug/i,
    });
    userEvent.click(btnType);

    const btnNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(btnNext);
    let renderTypePoke = screen.getByTestId('pokemon-type');
    expect(renderTypePoke.innerHTML).toEqual('Bug');

    userEvent.click(btnReset);
    userEvent.click(btnNext);
    renderTypePoke = screen.getByTestId('pokemon-name');
    expect(renderTypePoke.innerHTML).toEqual('Charmander');
  });
});
