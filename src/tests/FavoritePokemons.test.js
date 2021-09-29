import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../utils/renderWithRouter';
import pokemons from '../data';

describe('Testes FavoritePokemons.js', () => {
  test('Teste se a mensagem No favorite pokemon found aparece na tela', () => {
    renderWithRouter(<App />);

    const favoritesLink = screen.getByText('Favorite Pokémons');
    userEvent.click(favoritesLink);

    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });
});
