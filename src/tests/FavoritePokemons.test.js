import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

it('should appear msg "No favorite pokemon found" if user doesnt have fav poke', () => {
  render(
    <FavoritePokemons />,
  );
  const paragraphFavorite = screen.getByText('No favorite pokemon found');
  expect(paragraphFavorite).toBeInTheDocument();
});
it('should appear cards pokemon', () => {
  renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
  const pikachu = screen.getByText('Pikachu');
  expect(pikachu).toBeInTheDocument();
});
