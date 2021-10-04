import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

test('As informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
  renderWithRouter(<App />);
  const btnDragon = screen.getByRole('button', {
    name: 'Dragon',
  });
  const link = screen.getByRole('link', {
    name: 'More details',
  });
  fireEvent.click(btnDragon);
  fireEvent.click(link);

  const headerDetails = screen.getByRole('heading', {
    name: `${pokemons[8].name} Details`,
  });
  const headerSummary = screen.getByRole('heading', {
    name: 'Summary',
  });
  const paragraph = screen.getByText(/They say that if it emits an aura from its whole/i);

  expect(headerDetails).toHaveTextContent('Dragonair Details');
  expect(link).not.toBeInTheDocument();
  expect(headerSummary).toBeInTheDocument();
  expect(paragraph).toBeInTheDocument();
});
