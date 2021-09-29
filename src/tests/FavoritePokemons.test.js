import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../utils/renderWithRouter';

describe('Verifica se a FavoritePokemons contém as informações corretas', () => {
  it('Verifica se a mensagem "No favorite pokemon found" é exibida,'
  + ' se a pessoa não tiver pokemons favoritos', () => {
    const favoritePokemons = [];
    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemons } />);

    const message = screen.getByText('No favorite pokemon found');

    expect(message).toBeInTheDocument();
  });

  it('Verifica se todos os cards de pokemons favoritados são mostrados', () => {
    const favoritePokemons = [
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
        summary: 'This intelligent Pokémon roasts hard berries with electricity'
        + 'to make them tender enough to eat.',
      },
      {
        id: 4,
        name: 'Charmander',
        type: 'Fire',
        averageWeight: {
          value: '8.5',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
        foundAt: [
          {
            location: 'Alola Route 3',
            map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
          },
          {
            location: 'Kanto Route 3',
            map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
          },
          {
            location: 'Kanto Route 4',
            map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
          },
          {
            location: 'Kanto Rock Tunnel',
            map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
          },
        ],
        summary: 'The flame on its tail shows the strength of its life force.'
        + 'If it is weak, the flame also burns weakly.',
      },
      {
        id: 23,
        name: 'Ekans',
        type: 'Poison',
        averageWeight: {
          value: '6.9',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Ekans_(Pok%C3%A9mon)',
        foundAt: [
          {
            location: 'Goldenrod Game Corner',
            map: 'https://cdn2.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png',
          },
        ],
        summary: 'It can freely detach its jaw to swallow large prey whole.'
        + 'It can become too heavy to move, however.',
      },
      {
        id: 65,
        name: 'Alakazam',
        type: 'Psychic',
        averageWeight: {
          value: '48.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)',
        foundAt: [
          {
            location: 'Unova Accumula Town',
            map: 'https://cdn2.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png',
          },
        ],
        summary: 'Closing both its eyes heightens all its other senses.'
        + 'This enables it to use its abilities to their extremes.',
      },
    ];

    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemons } />);

    const favorites = screen.getAllByRole('link', { name: 'More details' });
    expect(favorites).toHaveLength(favoritePokemons.length);
  });
});
