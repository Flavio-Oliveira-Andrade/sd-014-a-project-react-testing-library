import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibido na tela a mensagem "Favorite pokémons"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');

    const favoritePokemon = screen.getByRole('heading', {
      level: 2,
      name: 'Favorite pokémons',
    });
    expect(favoritePokemon).toBeInTheDocument();
  });

  test('Teste se é exibido na tela a mensagem "No favorite pokemon found",'
  + 'se a pessoa não tiver pokémons favoritos', () => {
    const { history } = renderWithRouter(<FavoritePokemons />);
    history.push('/favorites');

    const storage = localStorage.getItem('favoritePokemonIds');
    const paragraphs = screen.getByText('Favorite pokémons');
    expect(paragraphs).toBeInTheDocument();
  });
});
