import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

const pokemon = data[0];

test('Teste o componente <PokemonDetails.js />', () => {
  renderWithRouter(<App />);

  fireEvent.click(
    screen.getByText('More details'),
  );

  expect(
    screen.getByText(`${pokemon.name}`),
  ).toBeInTheDocument();

  expect(
    screen.queryByText('More details'),
  ).not.toBeInTheDocument();

  expect(
    screen.getAllByRole('heading', { level: 2 })[1].textContent,
  ).toBe('Summary');

  expect(
    screen.getByText(`${pokemon.summary}`),
  ).toBeInTheDocument();
});
