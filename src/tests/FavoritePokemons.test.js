import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa se o componente Favorite Pokemons é renderizado', () => {
  it('Testa se é exibido No Favorite Pokemon Found', () => {
    render(<FavoritePokemons />);
    const notFoundPokemon = screen.getByText('No favorite pokemon found');
    expect(notFoundPokemon).toBeInTheDocument();
  });

  it('Testa se é exibido o card de pokemons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const isFavoriteChecked = screen.getByRole('checkbox');
    expect(isFavoriteChecked).toBeInTheDocument();
    userEvent.click(isFavoriteChecked);

    const linkFavorite = screen.getByRole('link', {
      name: /Favorite pokémons/i,
    });
    expect(linkFavorite).toBeInTheDocument();
    userEvent.click(linkFavorite);

    const namePokemon = screen.getByTestId('pokemon-name');
    const typePokemon = screen.getByTestId('pokemon-type');

    expect(namePokemon).toBeInTheDocument();
    expect(typePokemon).toBeInTheDocument();
  });
});
