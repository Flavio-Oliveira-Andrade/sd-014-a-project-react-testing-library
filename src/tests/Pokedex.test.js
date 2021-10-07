import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('should appear h2 with text "Encountered Pokemons"', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const encounteredText = screen.getByRole('heading', {
    level: 2,
    name: 'Encountered pokémons',
  });
  expect(encounteredText).toBeInTheDocument();
});

test('should appear next pokemon after click', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const buttonNext = screen.getByRole('button', {
    name: 'Próximo pokémon',
  });
  expect(buttonNext).toBeInTheDocument();
});

test('should appear one pokemon at a time', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const list = screen.getAllByTestId('pokemon-name');
  expect(list).toHaveLength(1);
});

test('should have filter buttons', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const buttonType = screen.getByRole('button', {
    name: 'Fire',
  });
  userEvent.click(buttonType);

  const pokemonType = screen.getByTestId('pokemon-type');
  expect(pokemonType.innerHTML).toEqual('Fire');
});

test('should circulate among pokemons of the same type', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const pokemonsQtd = 7;
  const buttonType = screen.getAllByTestId('pokemon-type-button');

  expect(buttonType).toHaveLength(pokemonsQtd);
});

test('should have a button to reset filter', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const resetButton = screen.getByRole('button', {
    name: 'All',
  });
  expect(resetButton).toBeInTheDocument();

  userEvent.click(resetButton);
});
