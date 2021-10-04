import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Testando Pokedex', () => {
  test('Verifica se a página contém um título "Encountered pokémons"', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(homeLink);
    const titlePokedex = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(titlePokedex).toBeInTheDocument();
  });
  test('Verifica se é exibido o próximo pokémon da lista ao clicar'
    + ' no botão "Próximo pokémon"', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const buttonNext = screen.getByTestId('next-pokemon');
    expect(buttonNext).toBeInTheDocument();
    const pokemon = screen.getByTestId('pokemon-name');
    userEvent.click(buttonNext);
    expect(pokemon.innerHTML).toBe('Charmander');
  });
  test('Verifica se é mostrado um pokémon por vez', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon).toHaveLength(1);
  });
  test('Verifica se a pokédex tem os botoes de filtro', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    const lengthFilters = 7;
    expect(buttonAll).toBeInTheDocument();
    const filtersButton = screen.getAllByTestId('pokemon-type-button');
    expect(filtersButton).toHaveLength(lengthFilters);
    userEvent.click(filtersButton[1]);
    const pokeFilter = screen.getByTestId('pokemon-type');
    expect(pokeFilter.innerHTML).toEqual(filtersButton[1].innerHTML);
    const buttonNext = screen.getByTestId('next-pokemon');
    userEvent.click(buttonNext);
    const poke2 = screen.getByTestId('pokemon-type');
    expect(pokeFilter.innerHTML).toEqual(poke2.innerHTML);
  });
  test('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
  });
});
