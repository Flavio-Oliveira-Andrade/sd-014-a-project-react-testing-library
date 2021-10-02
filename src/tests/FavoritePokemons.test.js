import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/RenderWithRouter';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

describe('Testa o componente <FavoritePokemons.js/>', () => {
  test('Testa se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    expect(screen.getByText(/No favorite pokemon found/)).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [pokemons[0]] } />);
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toBeInTheDocument();
  }); // consulta ao repo do colega Rodolfo Pinheiro (T14A)
});
