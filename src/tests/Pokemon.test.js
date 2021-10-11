import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const getPokemonDetailsLink = () => screen.getByRole('link', { name: 'More details' });
const EXPECTED_URL = '/pokemons/25';

test('Testa se é renderizado um card com as informações de determinado pokémon', () => {
  renderWithRouter(<App />);
  const POKEMON_NAME = screen.getByTestId('pokemon-name');
  const POKEMON_TYPE = screen.getByTestId('pokemon-type');
  const POKEMON_WEIGHT = screen.getByTestId('pokemon-weight');
  const POKEMON_SPRITE = screen.getByRole('img', { name: 'Pikachu sprite' });

  expect(POKEMON_NAME).toHaveTextContent('Pikachu');
  expect(POKEMON_TYPE).toHaveTextContent('Electric');
  expect(POKEMON_WEIGHT).toHaveTextContent('Average weight: 6.0 kg');
  expect(POKEMON_SPRITE).toBeInTheDocument();
  expect(POKEMON_SPRITE).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('Testa se o card contém um link de navegação que, quando clicado, '
  + 'redireciona para a página de detalhes do Pokémon', () => {
  const { history } = renderWithRouter(<App />);
  expect(getPokemonDetailsLink()).toBeInTheDocument();
  expect(getPokemonDetailsLink()).toHaveAttribute('href', EXPECTED_URL);

  userEvent.click(getPokemonDetailsLink());
  const { pathname } = history.location;
  expect(pathname).toBe(EXPECTED_URL);
});

test('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
  const { history } = renderWithRouter(<App />);
  userEvent.click(getPokemonDetailsLink());
  const { pathname } = history.location;
  expect(pathname).toBe(EXPECTED_URL);
  const FAVORITE_POKEMON = screen.getByRole('checkbox');
  userEvent.click(FAVORITE_POKEMON);
  const STAR_ICON = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });

  expect(STAR_ICON).toBeInTheDocument();
  expect(STAR_ICON).toHaveAttribute('src', '/star-icon.svg');
});
