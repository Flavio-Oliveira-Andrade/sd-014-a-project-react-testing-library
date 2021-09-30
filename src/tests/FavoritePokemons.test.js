import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../utilities/renderWithRouter';

describe('', () => {
  it('testa se não tem pokemons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavorite = screen.getByText(/No favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });
  it('testa se renderiza o pokemon favoritado', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', {
      name: /More details/i,
    });

    fireEvent.click(details);
    const pathName = history.location.pathname;
    expect(pathName).not.toBe('/');
    const favorite = screen.getByRole('checkbox');
    fireEvent.click(favorite);
    history.push('/favorites');
    const namePokemon = screen.getByText('Pikachu');
    expect(namePokemon).toBeInTheDocument();
  });
});
