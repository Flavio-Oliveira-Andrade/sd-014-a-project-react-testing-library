import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';

import { FavoritePokemons } from '../components';
import pokemons from '../data';

describe('Testando o componente FavoritePokemons', () => {
  it('é exibido na tela a mensagem No favorite pokemon found,'
  + ' se a pessoa não tiver pokémons favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);
    const message = screen.getByText(/no favorite pokemon/i);
    expect(message).toBeInTheDocument();
  });
  it('é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [pokemons[0]] } />);
    const pokemon = screen.getByText(/Pikachu/i);
    expect(pokemon).toBeInTheDocument();
  });
  // baseado no codigo desse repositorio abaixo;
  // https://github.com/tryber/sd-013-a-project-react-testing-library/tree/pedroalles-react-testing
});
