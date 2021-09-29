import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';

const renderWithRouter = (component) => {
  const customHistory = createMemoryHistory();
  const utils = render(
    <Router history={ customHistory }>
      { component }
    </Router>,
  );

  return {
    ...utils,
    history: customHistory,
  };
};

const pokemon = [
  {
    averageWeight: {
      measurementUnit: 'kg',
      value: '8.5',
    },
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
    id: 4,
    image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    name: 'Charmander',
    summary: 'The flame on its tail shows the strength of its life force.',
    type: 'Fire',
  },
];

describe('tests FavoritePokemons.js component', () => {
  it('renders the "No favorite pokemon found" text', () => {
    renderWithRouter(<FavoritePokemons />);

    const noFavFound = screen.getByText(/no favorite pokemon found/i);
    expect(noFavFound).toBeInTheDocument();
  });

  it('renders favorited pokemon cards', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemon } />);

    const favPokemon = screen.getByText(/charmander/i);
    expect(favPokemon).toBeInTheDocument();
  });
});
