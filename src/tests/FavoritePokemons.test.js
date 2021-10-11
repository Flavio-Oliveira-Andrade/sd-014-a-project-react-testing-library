import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Tests the FavoritePokemons component', () => {
  it('should render a message if no favorite pokemon added', () => {
    renderWithRouter(<FavoritePokemons />);

    const MESSAGE = /no favorite pokemon found/i;
    const message = screen.getByText(MESSAGE);
    expect(message).toBeInTheDocument();
  });
});
