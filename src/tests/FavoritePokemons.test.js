import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';

import renderWithRouter from './renderWithRouter';

describe('Teste no componente <FavoritePokemons.js />', () => {
  it('Teste se exibe "No favorite pokemon found", caso não aja favoritos', () => {
    const { screen } = renderWithRouter(<FavoritePokemons />, { route: '/favorites' });
    const textNotFound = screen.getByText(/No favorite pokemon found/i);
    expect(textNotFound).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const favoritePokemon = [{
      id: 4,
      name: 'Charmander',
      type: 'Fire',
      averageWeight: {
        value: '8.5',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
      foundAt: [{
        location: 'Alola Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
      }, {
        location: 'Kanto Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
      }, {
        location: 'Kanto Route 4',
        map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
      }, {
        location: 'Kanto Rock Tunnel',
        map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
      }],
      summary: 'The flame on its tail shows the strength of its life force.',
    }];

    const { screen } = renderWithRouter(<FavoritePokemons pokemons={ favoritePokemon } />,
      { route: '/favorites' });

    const textPokemon = screen.getByText(/Charmander/i);
    expect(textPokemon).toBeInTheDocument();
  });
});
