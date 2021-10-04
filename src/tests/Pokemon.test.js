import React from 'react';
import {
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

test('se é renderizado um card com as informações de determinado pokémon', () => {
  renderWithRouter(<App />);

  const cardPokemonName = screen.getByTestId('pokemon-name').innerHTML;
  expect(cardPokemonName).toEqual('Pikachu');

  const cardPokemonType = screen.getByTestId('pokemon-type').innerHTML;
  expect(cardPokemonType).toEqual('Electric');

  const cardPokemonWeight = screen.getByTestId('pokemon-weight').innerHTML;
  expect(cardPokemonWeight).toEqual('Average weight: 6.0 kg');

  const cardPokemonImg = screen.getByRole('img', { name: /pikachu sprite/i });
  expect(cardPokemonImg)
    .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(cardPokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
});

test('se o card do Pokémon indicado na Pokédex contém um link "More details"', () => {
  renderWithRouter(<App />);

  const linkDetails = screen.getByRole('link', { name: /More details/i });
  expect(linkDetails).toHaveAttribute('href', '/pokemons/25');
});

test('se ao clicar no link de navegação do Pokémon, é feito o redirecionamento', () => {
  renderWithRouter(<App />);

  const linkDetails = screen.getByRole('link', { name: /More details/i });
  userEvent.click(linkDetails);
  const textPage = screen.getByRole('heading', { name: /pikachu details/i });
  expect(textPage).toBeInTheDocument();
});

test('se a URL exibida no navegador muda', () => {
  const { history } = renderWithRouter(<App />);

  expect(history.location.pathname).toEqual('/');
  const linkDetails = screen.getByRole('link', { name: /More details/i });
  userEvent.click(linkDetails);
  expect(history.location.pathname).toEqual('/pokemons/25');
});

test('se existe um ícone de estrela nos Pokémons favoritados.', () => {
  renderWithRouter(<App />);

  const linkDetails = screen.getByRole('link', { name: /More details/i });
  userEvent.click(linkDetails);

  const favoriteCheckbox = screen
    .getByRole('checkbox', { name: /pokémon favoritado\?/i });
  userEvent.click(favoriteCheckbox);

  const starFavorite = screen
    .getByRole('img', { name: /pikachu is marked as favorite/i });
  expect(starFavorite).toHaveAttribute('src', '/star-icon.svg');
  expect(starFavorite).toHaveAttribute('alt', 'Pikachu is marked as favorite');
});
