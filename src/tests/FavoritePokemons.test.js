import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter.test';

import FavoritePokemons from '../components/FavoritePokemons';

describe('03-Teste o componente "FavoritePokemons.js"', () => {
  test('se é exibido na tela a mensagem No favorite pokemon found,'
  + 'se a pessoa não tiver pokémons favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavoritePokemon = screen.getByText('No favorite pokemon found');
    expect(noFavoritePokemon).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const pokemonFav = [
      {
        id: 25,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: {
          value: '6.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
        foundAt: [
          {
            location: 'Kanto Viridian Forest',
            map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
          },
          {
            location: 'Kanto Power Plant',
            map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
          },
        ],
        summary: 'This intelligent Pokémon roasts hard berries'
        + 'with electricity to make them tender enough to eat.',
      },
    ];
    renderWithRouter(<FavoritePokemons pokemons={ pokemonFav } />);
    const getPokemon = screen.getByText(/pikachu/i);
    expect(getPokemon).toBeInTheDocument();
  });
});
