import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

test('if shows the pokémon details on screen', () => {
  renderWithRouter(<App />);
  const $moreDetails = screen.getByText(/More Details/i);

  fireEvent.click($moreDetails);
  const pokeName = screen.getByText('Pikachu Details');
  const summary = screen.getByRole('heading', {
    level: 2,
    name: 'Summary',
  });
  const pokeInfo = screen.getByText(/This intelligent Pokémon roasts hard berries/i);
  expect(pokeName).toHaveTextContent('Pikachu Details');
  expect($moreDetails).not.toBeInTheDocument();
  expect(summary).toBeInTheDocument();
  expect(pokeInfo).toBeInTheDocument();
});

test('if shows maps', () => {
  renderWithRouter(<App />);
  const $details = screen.getByText(/More Details/i);
  fireEvent.click($details);
  const gameLocationOf = screen.getByRole('heading', {
    level: 2,
    name: /Game locations of Pikachu/i,
  });
  const pokeLocations = screen.getAllByRole('img', {
    name: /Pikachu location/i,
  });
  expect(gameLocationOf).toBeInTheDocument();
  expect(pokeLocations.length).toBe(2);
  expect(pokeLocations[0]).toHaveAttribute('src',
    'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
});

test('if favorites a pokémon', () => {
  renderWithRouter(<App />);
  const buttonDetails = screen.getByText(/More Details/i);

  fireEvent.click(buttonDetails);
  const checkbox = screen.getByRole('checkbox');
  const label = screen.getByText(/Pokémon favoritado?/i);

  fireEvent.click(checkbox);

  expect(checkbox).toBeTruthy();
  expect(label).toBeInTheDocument();
});
