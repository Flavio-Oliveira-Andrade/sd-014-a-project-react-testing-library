import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const nameID = 'pokemon-name';

test('verify correct text for heading', () => {
  renderWithRouter(<App />);
  const h2 = screen.getAllByRole('heading')[1];

  expect(h2).toHaveTextContent('Encountered pokémons');
});

test('verify correct usage of button', () => {
  renderWithRouter(<App />);
  const button = screen.getByTestId('next-pokemon');

  expect(button).toHaveTextContent('Próximo pokémon');

  fireEvent.click(button);
  const nextPokemon = screen.getByTestId(nameID);
  expect(nextPokemon).toHaveTextContent('Charmander');
});

test('verify correct length of pokemons', () => {
  renderWithRouter(<App />);
  const pokemon = screen.getAllByTestId(nameID);

  expect(pokemon).toHaveLength(1);
});

test('verify filter buttons', () => {
  renderWithRouter(<App />);
  const FILTER_LENGTH = 7;
  const buttons = screen.getAllByTestId('pokemon-type-button');

  expect(buttons).toHaveLength(FILTER_LENGTH);
  fireEvent.click(buttons[0]);

  const typeName = screen.getByTestId('pokemon-type');
  expect(typeName).toHaveTextContent('Electric');

  const buttonText = screen.getAllByTestId('pokemon-type-button');
  expect(buttonText[0]).toHaveTextContent('Electric');

  const allButton = screen.getByRole('button', { name: 'All' });
  expect(allButton).toBeVisible();
});

test('verify reset button', () => {
  renderWithRouter(<App />);
  const pokeName = screen.getByTestId(nameID);
  expect(pokeName).toBeInTheDocument();

  const allButton = screen.getByRole('button', { name: 'All' });
  expect(allButton).toBeInTheDocument();
  expect(allButton).toHaveTextContent('All');

  fireEvent.click(allButton);
  expect(pokeName).toHaveTextContent('Pikachu');
});
