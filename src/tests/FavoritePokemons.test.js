import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter/renderWithRouter';

describe('testa o componente FavoritePokemons', () => {
  it('verifica se a mensagem "No favorite pokemon found" é renderizada na tela', () => {
    renderWithRouter(<FavoritePokemons />);

    const initialMessage = screen.getByText('No favorite pokemon found');

    expect(initialMessage).toBeInTheDocument();
  });

  it('testa se a página renderiza os pokemons mockados', () => {
    const mockFavorites = [
      {
        id: 143,
        name: 'Snorlax',
        type: 'Normal',
        averageWeight: {
          value: '460.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Snorlax_(Pok%C3%A9mon)',
        foundAt: [
          {
            location: 'Kanto Vermillion City',
            map: 'https://cdn2.bulbagarden.net/upload/5/54/Kanto_Vermilion_City_Map.png',
          },
        ],
        summary: 'What sounds like its cry'
         + 'may actually be its snores or the rumblings of its hungry belly.',
      },
      {
        id: 148,
        name: 'Dragonair',
        type: 'Dragon',
        averageWeight: {
          value: '16.5',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Dragonair_(Pok%C3%A9mon)',
        foundAt: [
          {
            location: 'Johto Route 45',
            map: 'https://cdn2.bulbagarden.net/upload/2/21/Johto_Route_45_Map.png',
          },
          {
            location: 'Johto Dragon\'s Den',
            map: 'https://cdn2.bulbagarden.net/upload/1/1e/Johto_Dragons_Den_Map.png',
          },
        ],
        summary: 'They say that if it emits an aura from'
         + ' its whole body, the weather will begin to change instantly.',
      },
      {
        id: 151,
        name: 'Mew',
        type: 'Psychic',
        averageWeight: {
          value: '4.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/4/43/Spr_5b_151.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Mew_(Pok%C3%A9mon)',
        foundAt: [
          {
            location: 'Faraway Island',
            map: 'https://cdn2.bulbagarden.net/upload/e/e4/Hoenn_Faraway_Island_Map.png',
          },
        ],
        summary: 'Apparently, it appears only to those people'
        + ' who are pure of heart and have a strong desire to see it.',
      },
    ];
    renderWithRouter(<FavoritePokemons pokemons={ mockFavorites } />);

    const snorlax = screen.getByText(/snorlax/i);
    const dragonair = screen.getByText(/dragonair/i);
    const mew = screen.getByText(/mew/i);
    const pokemonShown = 3;

    const favorites = [snorlax, dragonair, mew];
    expect(favorites).toHaveLength(pokemonShown);
  });
});
