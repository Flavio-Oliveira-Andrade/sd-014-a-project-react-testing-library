import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pikachuMock from '../helper/pikachuMock';

test('display "No favorite pokemon found"', () => {
  renderWithRouter(<FavoritePokemons />);
  const messageNotFound = screen.getByText('No favorite pokemon found');
  expect(messageNotFound.textContent).toBe('No favorite pokemon found');
});

test('show all favorite pokemons', () => {
  renderWithRouter(
    <FavoritePokemons
      pokemons={ pikachuMock }
    />,
  );
  const favoritePokemonName = screen.getByTestId('pokemon-name');
  const favoritePokemonType = screen.getByTestId('pokemon-type');
  const favoritePokemonWeight = screen.getByTestId('pokemon-weight');
  const favoritePokemonImg = screen.getByAltText('Pikachu sprite');

  expect(favoritePokemonName.textContent).toBe('Pikachu');
  expect(favoritePokemonType.textContent).toBe('Electric');
  expect(favoritePokemonWeight.textContent).toBe('Average weight: 6.0 kg');
  expect(favoritePokemonImg.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});
