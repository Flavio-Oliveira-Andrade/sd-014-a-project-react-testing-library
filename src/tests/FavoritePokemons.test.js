import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Testar componente Favorite Pokemons', () => {
  test('Verifica se é exibido na pagina a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const titleFavorites = screen.getByText('No favorite '
    + 'pokemon found');
    expect(titleFavorites).toBeInTheDocument();
  });
  test('Verifica se exibe todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    const cards = screen.getByTestId(/pokemon-name/i);
    expect(cards).toBeInTheDocument();
  });
});
