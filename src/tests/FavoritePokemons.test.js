import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
};

const poke = [
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

describe('Testa a página de favoritos', () => {
  it('Caso nao tenha favoritos nos mostra a mensagem "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);
    const emptyFav = screen.getByText(/No favorite pokemon found/i);
    expect(emptyFav).toBeInTheDocument();
  });

  it('Caso haja favoritos nos mostre os respectivos cards', () => {
    renderWithRouter(<FavoritePokemons pokemons={ poke } />);
    const pokeFavorited = screen.getByText(/Charmander/i);
    expect(pokeFavorited).toBeInTheDocument();
  });
});
