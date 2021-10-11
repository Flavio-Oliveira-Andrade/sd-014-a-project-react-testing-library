import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('', () => {
  test('', () => {
    render(<FavoritePokemons />);
    const notFavoritesPokemon = screen.getByText(/No favorite pokemon found/i);
    expect(notFavoritesPokemon).toBeInTheDocument();
  });
  test('', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const moreDetails = screen.getByRole('link', { name: /More details/i });
    fireEvent.click(moreDetails);

    const checkboxChecked = screen.getByRole('checkbox');
    fireEvent.click(checkboxChecked);

    const favoritesLink = screen.getByRole('link', { name: /Favorite pokémons/i });
    fireEvent.click(favoritesLink);

    const favoritePokemon = screen.getByTestId('pokemon-name');

    expect(favoritePokemon).toBeInTheDocument();
  });
});
