import React from 'react';
import { render, screen } from '@testing-library/react';

import pokemons from '../data';
import { FavoritePokemons } from '../components';
import renderWithRouter from './Util/RenderWithRouter';

describe('Verifica component FavoritePokemons', () => {
  it('Verifica se exibe a mensagem "No favorite pokemon found"', () => {
    render(<FavoritePokemons />);

    const notFoundFavoriteText = screen.getByText(
      /No favorite pokemon found/i,
    );
    expect(notFoundFavoriteText).toBeInTheDocument();
  });
  it('Verifica se é exibido os pokemons favoritos', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [pokemons[0]] } />);

    const pokemonIdName = screen.getByTestId('pokemon-name');
    expect(pokemonIdName).toBeInTheDocument();
  });
});
