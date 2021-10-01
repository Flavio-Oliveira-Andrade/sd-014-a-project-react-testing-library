import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa o componente <FavoritePokemons />', () => {
  test('Testa se é exibido na tela a mensagem "No favorite pokemon found", se a pessoa'
  + 'não tiver pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
  });
});

test('', () => {});
