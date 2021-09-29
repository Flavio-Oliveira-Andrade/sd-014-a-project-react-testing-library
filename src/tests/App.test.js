import React from 'react';

import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';

import App from '../App';

test('renders a reading with the text "Pokédex"', () => {
  renderWithRouter(<App />);
  expect(screen.getByText(/pokédex/i)).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { history } = renderWithRouter(<App />);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  expect(screen.getByText('Encountered pokémons')).toBeInTheDocument();
});

test('there are 3 nav links at the Pokédex', () => {
  renderWithRouter(<App />);
  expect(screen.getByRole('link', { name: 'Home' })).not.toBeNull();
  expect(screen.getByRole('link', { name: 'About' })).not.toBeNull();
  expect(screen.getByRole('link', { name: 'Favorite Pokémons' })).not.toBeNull();
});

test('goes to `/` in the pathname when click Home', () => {
  const { history: { location: { pathname } } } = renderWithRouter(<App />);
  const home = screen.getByRole('link', { name: 'Home' });
  fireEvent.click(home);
  expect(pathname).toBe('/');
});

test('goes to `/about` in the pathname when click About', () => {
  const { history } = renderWithRouter(<App />);
  const about = screen.getByRole('link', { name: 'About' });
  fireEvent.click(about);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('goes to `/favorites` in the pathname when click Favorite Pokémons', () => {
  const { history } = renderWithRouter(<App />);
  const favorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
  fireEvent.click(favorites);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('goes to Not Found page when unknown pathname have been navigate for', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/not-found-test-page');
  expect(screen.getByText('Page requested not found')).toBeDefined();
});
