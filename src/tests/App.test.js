import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  const { history } = renderWithRouter(<App />);

  expect(
    screen.getByText('Home'),
  ).toBeInTheDocument();

  expect(
    screen.getByText('About'),
  ).toBeInTheDocument();

  expect(
    screen.getByText('Favorite Pokémons'),
  ).toBeInTheDocument();

  fireEvent.click(
    screen.getByText('Home'),
  );

  expect(
    history.location.pathname,
  ).toBe('/');

  fireEvent.click(
    screen.getByText('About'),
  );

  expect(
    history.location.pathname,
  ).toBe('/about');

  expect(
    screen.getByText('About Pokédex'),
  ).toBeInTheDocument();

  fireEvent.click(
    screen.getByText('Favorite Pokémons'),
  );

  expect(
    history.location.pathname,
  ).toBe('/favorites');

  expect(
    screen.getByText('Favorite pokémons'),
  ).toBeInTheDocument();

  history.push('anythingelse');

  expect(
    screen.getByText('Page requested not found'),
  ).toBeInTheDocument();
});
