import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

test('if a card with the information for a particular Pokémon is rendered', () => {
  const { history } = renderWithRouter(<App />);
  const pokeName = screen.getByTestId('pokemon-name');
  const pokeType = screen.getByTestId('pokemon-type');
  const pokeWeight = screen.getByTestId('pokemon-weight');
  const image = screen.getByAltText('Pikachu sprite');

  expect(pokeName).toHaveTextContent('Pikachu');
  expect(pokeType).toHaveTextContent('Electric');
  expect(pokeWeight).toHaveTextContent('Average weight: 6.0 kg');
  expect(image).toBeInTheDocument();
  expect(image).not.toHaveAttribute('src', '');

  const $moreDetails = screen.getByText('More details');
  expect($moreDetails).toHaveAttribute('href', '/pokemons/25');
  fireEvent.click($moreDetails);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
  const $favorite = screen.getByText('Pokémon favoritado?');
  fireEvent.click($favorite);
  history.push('/');
  const $favoriteIcon = screen.getByAltText('Pikachu is marked as favorite');
  expect($favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  expect($favoriteIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
});
