import React from 'react';
import { render, screen } from '@testing-library/react';

import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './utils/renderWithRouter';
import Pokemons from '../data';

describe('Requisito 3, testa o FavoritePokemons.js', () => {
  it('Testa se é exibido na tela a mensagem No favorite pokemon found,'
  + 'se a pessoa não tiver pokémons favoritos.', () => {
    render(<FavoritePokemons />);
    const noFavs = screen.getByText('No favorite pokemon found');

    expect(noFavs).toBeInTheDocument();
  });

  it('Testa se é exibido todos os cards de pokémons favoritados.', async () => {
    renderWithRouter(<FavoritePokemons pokemons={ Pokemons } />);
    const name = screen.getAllByTestId('pokemon-name');
    const type = screen.getAllByTestId('pokemon-type');
    const size = screen.getAllByTestId('pokemon-weight');

    expect(name[0]).toBeInTheDocument();
    expect(type[1]).toBeInTheDocument();
    expect(size[2]).toBeInTheDocument();
  });
});
