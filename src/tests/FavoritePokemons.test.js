import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testa componente FaviritePokemons.js', () => {
  test('Testa caso em que não há pokemons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);

    const noFavoritePokemonText = screen.getByText('No favorite pokemon found');

    expect(noFavoritePokemonText).toBeInTheDocument();
  });

  test('Testa caso em que há pokemons favoritos', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetailsLink);

    const favoritePokemonsLink = screen.getByRole('link', { name: /favorite pokémons/i });
    const favoriteCheckbox = screen.getByRole('checkbox');

    userEvent.click(favoriteCheckbox);
    userEvent.click(favoritePokemonsLink);

    const favoritePokemonsHeading = screen.getByRole('heading', {
      level: 2,
      name: /favorite pokémons/i,
    });
    const favoritePokemon = screen.getByText(/pikachu/i);

    expect(favoritePokemonsHeading).toBeInTheDocument();
    expect(favoritePokemon).toBeInTheDocument();
  });
});
