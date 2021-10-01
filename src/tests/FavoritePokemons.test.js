import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Requisito 3', () => {
  test('É exibido "No favorite pokemon found", se não tiver pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const text = 'No favorite pokemon found';
    const phrase = screen.getByText(text);
    expect(phrase).toBeInTheDocument();
  });
});
