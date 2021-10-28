import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

import renderWithRouter from './renderWithRouter';

describe('3. Teste o componente <FavoritePokemons.js />', () => {
  beforeEach(() => renderWithRouter(<App />));

  test('É exibido "No favorite pokemon found" quando não houverem favoritos', () => {
    const favs = screen.getByRole('link', { name: /Favorite pokémons/i });
    userEvent.click(favs);

    const message = screen.getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });

  test('São exibidos todos os cards de pokémons favoritos', () => {
    const cards = screen.getByRole('link', { name: /More details/i });
    userEvent.click(cards);

    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);

    const pokemonName = screen.getByTestId('pokemon-name').textContent;

    const favs = screen.getByRole('link', { name: /Favorite pokémons/i });
    userEvent.click(favs);

    const text = screen.getByText(pokemonName);
    expect(text).toBeInTheDocument();
  });
});
