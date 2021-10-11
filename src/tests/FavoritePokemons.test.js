import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './utils/renderWithRouter';
import pokemons from '../data';

describe('Testes do componente <FavoritePokemons />', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found,'
  + ' se a pessoa não tiver pokémons favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);
    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  test('Se é exibido todos os cards de pokémons favoritados.', () => {
    const pokemonsList = [pokemons[0], pokemons[1]];
    renderWithRouter(<FavoritePokemons pokemons={ pokemonsList } />);
    expect(screen.queryAllByTestId('pokemon-name')).toHaveLength(2);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });
});
