import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Req 3 - FavoritePokemons.js', () => {
  test(
    'Checks if the message "No favorite pokemon found" if no pokemons are favorited',
    () => {
      localStorage.clear();
      render(<FavoritePokemons />);
      const favoritePokemonCheck = screen.getByText(/no favorite pokemon found/i);
      expect(favoritePokemonCheck).toBeInTheDocument();
    },
  );

  test('Checks if all favorited Pokemon are rendered', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const navigatesToDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(navigatesToDetails);

    const checkForFavoritePokemonCard = screen.getByRole('checkbox');
    userEvent.click(checkForFavoritePokemonCard);

    const navigatesToFavorites = screen.getByRole('link', {
      name: /favorite pokémons/i,
      exact: false,
    });
    userEvent.click(navigatesToFavorites);

    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();
  });
});
