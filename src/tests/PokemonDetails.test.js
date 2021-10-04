import React from 'react';
import {
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

const routerDetails = '/pokemons/25';

test('se as informações detalhadas do Pokémon são mostradas na tela.', () => {
  const { history } = renderWithRouter(<App />);
  history.push(routerDetails);

  const nameDetails = screen.getByRole('heading', { name: /pikachu details/i });
  expect(nameDetails).toBeInTheDocument();

  const linkDetails = screen.queryByText(/More details/i);
  expect(linkDetails).toBeNull();

  const textSummary = screen.getByRole('heading', {
    level: 2,
    name: /Summary/i,
  });
  expect(textSummary).toBeInTheDocument();

  const textParagraph = screen.getByText(/This intelligent Pokémon roasts/i);
  expect(textParagraph).toBeInTheDocument();
});

test('se existe na página uma seção com os mapas.', () => {
  const { history } = renderWithRouter(<App />);
  history.push(routerDetails);

  const textSummary = screen.getByRole('heading', {
    level: 2,
    name: /game locations of pikachu/i,
  });
  expect(textSummary).toBeInTheDocument();

  const imageLocations = screen.getAllByRole('img', { name: /pikachu location/i });
  const quantLocations = 2;
  expect(imageLocations.length).toEqual(quantLocations);
  expect(imageLocations[0])
    .toHaveAttribute(
      'src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      'alt', 'Pikachu location',
    );

  const locationName = screen.getByText('Kanto Viridian Forest');
  expect(locationName).toBeInTheDocument();
});

test('se o usuário pode favoritar um pokémon através da página de detalhes.', () => {
  const { history } = renderWithRouter(<App />);
  history.push(routerDetails);

  const checkboxFavorite = screen
    .getByRole('checkbox', { name: /pokémon favoritado\?/i });
  expect(checkboxFavorite).toBeInTheDocument();

  userEvent.click(checkboxFavorite);
  let starFavorite = screen
    .queryByRole('img', { name: /pikachu is marked as favorite/i });
  expect(starFavorite).toBeInTheDocument();

  userEvent.click(checkboxFavorite);
  starFavorite = screen.queryByRole('img', { name: /pikachu is marked as favorite/i });
  expect(starFavorite).toBeNull();

  const labelFavorite = screen.getByLabelText('Pokémon favoritado?');
  expect(labelFavorite).toBeInTheDocument();
});
