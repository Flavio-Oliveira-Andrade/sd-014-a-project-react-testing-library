import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Test FavoritePokemons component', () => {
  it('should display No favorite pokemon found message', () => {
    render(<FavoritePokemons />);
    const message = screen.getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });

  it('should display all favorite Pokemon cards', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const cards = screen.getAllByTestId('pokemon-name');
    expect(cards.length).toBe(pokemons.length);
  });
});
