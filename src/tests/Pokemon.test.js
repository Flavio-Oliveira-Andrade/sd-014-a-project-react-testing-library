import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { Pokemon } from '../components';

test('verify render pokemon card', () => {
  renderWithRouter(<App />);
  const pokeName = screen.getByTestId('pokemon-name');
  expect(pokeName).toHaveTextContent('Pikachu');

  const pokeType = screen.getByTestId('pokemon-type');
  expect(pokeType).toHaveTextContent('Electric');

  const pokeWeigth = screen.getByTestId('pokemon-weight');
  expect(pokeWeigth).toHaveTextContent('Average weight: 6.0 kg');

  const pokeImg = screen.getByRole('img');
  expect(pokeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(pokeImg).toHaveAttribute('alt', 'Pikachu sprite');
});

test('verify link path', () => {
  renderWithRouter(<App />);
  const link = screen.getByRole('link', { name: 'More details' });
  expect(link).toHaveAttribute('href', '/pokemons/25');
});

test('verify link event', () => {
  const { history } = renderWithRouter(<App />);
  const link = screen.getByRole('link', { name: 'More details' });
  fireEvent.click(link);
  const resumo = screen.getByText('Summary');
  expect(resumo).toBeInTheDocument();
  expect(resumo).toBeVisible();

  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});

test('verify star icon', () => {
  // renderWithRouter(<App />);
  const pokeData = {
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    name: 'Pikachu',
  };
  renderWithRouter(<Pokemon pokemon={ pokeData } isFavorite />);
  const image = screen.getAllByRole('img');
  expect(image[1]).toHaveAttribute('src', '/star-icon.svg');
  expect(image[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
});
