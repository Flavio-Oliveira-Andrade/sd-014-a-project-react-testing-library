import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Test <FavoritePokemons.js /> component', () => {
  it('should show a message if there are no favorite pokémons', () => {
    render(<FavoritePokemons />);
    const noFavoritePokemonMessage = screen.getByText(/No favorite pokemon found/i);

    expect(noFavoritePokemonMessage).toBeInTheDocument();
  });

  it('should show every favorite pokémon card', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const pokemonCards = screen.getAllByTestId('pokemon-name');

    expect(pokemonCards.length).toEqual(pokemons.length);
  });
});
