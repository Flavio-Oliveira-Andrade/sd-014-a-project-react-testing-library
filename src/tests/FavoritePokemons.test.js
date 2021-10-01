import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import { FavoritePokemons } from '../components';

describe('Elemento do componente <FavoritePokemon/>', () => {
  it('É exibido na tela a mensagem "No favorite pokemon found"'
  + ', se a pessoa não tiver pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const textFavoritePokemon = screen.getByText(/no favorite pokemon found/i);
    expect(textFavoritePokemon).toBeInTheDocument();
  });
});
