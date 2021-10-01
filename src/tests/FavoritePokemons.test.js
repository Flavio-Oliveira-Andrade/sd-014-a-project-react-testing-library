import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './utils/renderWithRouter';
import pokemons from '../data';

const MOCKED_PKM = [pokemons[0]];

describe('tests FavoritePokemons.js component', () => {
  it('renders the "No favorite pokemon found" text', () => {
    renderWithRouter(<FavoritePokemons />);

    const noFavFound = screen.getByText(/No favorite pokemon found/);
    expect(noFavFound).toBeInTheDocument();
  });

  it('renders favorited pokemon cards', () => {
    renderWithRouter(<FavoritePokemons pokemons={ MOCKED_PKM } />);

    const favPokemon = screen.getByText(/Pikachu/);
    expect(favPokemon).toBeInTheDocument();
  });
});
