import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('3. Teste o componente <FavoritePokemons.js />', () => {
  beforeEach(() => renderWithRouter(<App />));

  test('É exibido "No favorite pokemon found", se a pessoa não tiver favoritos', () => {
    const favoritesLink = screen.getByRole('link', { name: /Favorite pokémons/i });
    userEvent.click(favoritesLink);

    const message = screen.getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });

  test('São exibidos todos os cards de pokémons favoritados', () => {
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsLink);

    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);

    const pokemonName = screen.getByTestId('pokemon-name').textContent;

    const favoritesLink = screen.getByRole('link', { name: /Favorite pokémons/i });
    userEvent.click(favoritesLink);

    const text = screen.getByText(pokemonName);
    expect(text).toBeInTheDocument();
  });
});
