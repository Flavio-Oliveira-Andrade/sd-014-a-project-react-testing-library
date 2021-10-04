import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Testa o componente <FavoritePokemons.js />', () => {
  it('É exibido "No favorite pokemon found", se não tiver pokémons favoritos.', () => {
    render(<FavoritePokemons />);
    const noFavorites1 = screen.getByText(/No favorite/i);
    const noFavorites2 = screen.getByText(/pokemon found/i);
    expect(noFavorites1 && noFavorites2).toBeInTheDocument();
  });

  it('É exibido todos os cards de pokémons favoritados.', () => {
    render(<App />, { wrapper: MemoryRouter });
    const details = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(details);
    const addfavorite = screen.getByText(/pokémon favorito?/i);
    fireEvent.click(addfavorite);
    const favorites = screen.getByRole('link', { name: /favorite/i });
    fireEvent.click(favorites);
    const getPokemon01 = screen.getByTestId('pokemon-name');
    const getPokemon02 = screen.getByTestId('pokemon-type');
    const getPokemon03 = screen.getByTestId('pokemon-weight');
    expect(getPokemon01).toBeInTheDocument();
    expect(getPokemon02).toBeInTheDocument();
    expect(getPokemon03).toBeInTheDocument();
  });
});
