import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

test('Teste o componente <FavoritePokemons.js />', () => {
  const { history } = renderWithRouter(<App />);
  const MIN_IMG_IN_SCREEN = 4;

  fireEvent.click(
    screen.getByText('Favorite Pokémons'),
  );

  expect(
    history.location.pathname,
  ).toBe('/favorites');

  expect(
    screen.getByText('No favorite pokemon found'),
  ).toBeInTheDocument();

  fireEvent.click(
    screen.getByText('Home'),
  );

  fireEvent.click(
    screen.getByText('More details'),
  );

  expect(
    screen.getByText('Pikachu Details'),
  ).toBeInTheDocument();

  fireEvent.click(
    screen.getByLabelText('Pokémon favoritado?'),
  );

  fireEvent.click(
    screen.getByText('Home'),
  );

  fireEvent.click(
    screen.getByText('Normal'),
  );

  fireEvent.click(
    screen.getByText('More details'),
  );

  fireEvent.click(
    screen.getByLabelText('Pokémon favoritado?'),
  );

  fireEvent.click(
    screen.getByText('Favorite Pokémons'),
  );

  expect(
    screen.getAllByRole('img'),
  ).toHaveLength(MIN_IMG_IN_SCREEN);

  expect(
    screen.getByText('Pikachu'),
  ).toBeInTheDocument();
});
