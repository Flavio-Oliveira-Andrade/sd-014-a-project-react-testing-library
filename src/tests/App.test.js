import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('verify link elements', () => {
  renderWithRouter(<App />);
  const home = screen.getByText('Home');
  const about = screen.getByText('About');
  const favPokemons = screen.getByText('Favorite Pokémons');

  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favPokemons).toBeInTheDocument();
});

test('verify the correct path to Home', () => {
  const { history } = renderWithRouter(<App />);
  fireEvent.click(screen.getByText('Home'));
  const path = history.location.pathname;

  expect(path).toBe('/');
});

test('verify the correct path to About', () => {
  // renderWithRouter(<App />);
  const { history } = renderWithRouter(<App />);
  fireEvent.click(screen.getByText('About'));
  const path = history.location.pathname;

  expect(path).toBe('/about');
});

test('verify the correct path to Favorite Pokemons', () => {
  const { history } = renderWithRouter(<App />);
  fireEvent.click(screen.getByText('Favorite Pokémons'));
  const path = history.location.pathname;

  expect(path).toBe('/favorites');
});
