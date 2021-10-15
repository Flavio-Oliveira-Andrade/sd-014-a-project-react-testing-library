import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../render/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa se aplicação é renderizada para o componente FavoritePokemons', () => {
  test(`Se é exibido na tela a mensagem "No favorite pokemon found",
  se a pessoa não tiver pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons />);
    const textNoFavoritePokemonFound = screen.getByText('No favorite pokemon found');
    expect(textNoFavoritePokemonFound).toBeInTheDocument();
  });
});
