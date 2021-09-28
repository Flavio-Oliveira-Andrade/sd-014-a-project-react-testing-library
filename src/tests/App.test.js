import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('O primeiro link deve possuir o texto Home', () => {
  const { history } = renderWithRouter(<App />);
  const homeLink = screen.getByRole('link', {
    name: /home/i,
  });
  expect(homeLink).toBeInTheDocument();
  userEvent.click(homeLink);
  const pathName = history.location.pathname;
  expect(pathName).toBe('/');
});
test('O segundo link deve possuir o texto About', () => {
  const { history } = renderWithRouter(<App />);
  const aboutLink = screen.getByRole('link', {
    name: /about/i,
  });
  expect(aboutLink).toBeInTheDocument();
  userEvent.click(aboutLink);
  const pathName = history.location.pathname;
  expect(pathName).toBe('/about');
});
test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
  const { history } = renderWithRouter(<App />);
  const favoritesLink = screen.getByRole('link', {
    name: /favorite pokémons/i,
  });
  expect(favoritesLink).toBeInTheDocument();
  userEvent.click(favoritesLink);
  const pathName = history.location.pathname;
  expect(pathName).toBe('/favorites');
});
