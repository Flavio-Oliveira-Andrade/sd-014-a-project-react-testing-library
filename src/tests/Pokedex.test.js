import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const pokeTest = [
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
    summary: 'This intelligent Pokémon roasts hard berries with electricit',
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
    summary: 'The flame on its tail shows the strength of its life force.',
  },
  {
    id: 10,
    name: 'Caterpie',
    type: 'Bug',
    averageWeight: {
      value: '2.9',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Johto Route 30',
        map: 'https://cdn2.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png',
      },
      {
        location: 'Johto Route 31',
        map: 'https://cdn2.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png',
      },
      {
        location: 'Ilex Forest',
        map: 'https://cdn2.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png',
      },
      {
        location: 'Johto National Park',
        map: 'https://cdn2.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png',
      },
    ],
    summary: 'For protection, it releases a horrible stench from the a.',
  },
];

const isFav = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

const testIdType = 'pokemon-type';
const nextPokemonOptions = { name: 'Próximo pokémon' };

describe('Requirement - 5 : Pokedex', () => {
  it('should have h2 tag with "Encountered pokémons" text', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFav } />);
    const h2tag = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(h2tag).toBeInTheDocument();
  });
  it('should render next pokemon when click in "Próximo pokémon"', () => {
    renderWithRouter(<Pokedex pokemons={ pokeTest } isPokemonFavoriteById={ isFav } />);
    const nextPokemonButton = screen.getByRole('button', nextPokemonOptions);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId(testIdType);
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(nextPokemonButton).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    fireEvent.click(nextPokemonButton);
    expect(pokemonName).toHaveTextContent('Charmander');
    expect(pokemonType).toHaveTextContent('Fire');
    expect(pokemonWeight).toHaveTextContent('Average weight: 8.5 kg');
    fireEvent.click(nextPokemonButton);
    expect(pokemonName).toHaveTextContent('Caterpie');
    expect(pokemonType).toHaveTextContent('Bug');
    expect(pokemonWeight).toHaveTextContent('Average weight: 2.9 kg');
    fireEvent.click(nextPokemonButton);
    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
  });
  it('should render all pokemons filter', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFav } />);
    expect(screen.getByRole('button', { name: 'All' })).toBeVisible();
    pokemons.forEach((pokemon) => {
      expect(screen.getByRole('button', { name: pokemon.type })).toBeVisible();
    });
  });
  it('should have button to reset filters', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFav } />);
    const nextPokemonButton = screen.getByRole('button', nextPokemonOptions);
    const pokemonType = screen.getByTestId(testIdType);
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
    expect(nextPokemonButton).toBeInTheDocument();
    pokemons.forEach((pokemon) => {
      expect(pokemonType).toHaveTextContent(pokemon.type);
      fireEvent.click(nextPokemonButton);
    });
    fireEvent.click(allButton);
    pokemons.forEach((pokemon) => {
      expect(pokemonType).toHaveTextContent(pokemon.type);
      fireEvent.click(nextPokemonButton);
    });
  });
  it('button filters should work', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFav } />);
    const filters = screen.getAllByTestId('pokemon-type-button');
    const nextPokemonButton = screen.getByRole('button', nextPokemonOptions);
    const pokemonType = screen.getByTestId(testIdType);
    filters.forEach((filter) => {
      const type = filter.textContent;
      fireEvent.click(filter);
      for (let i = 0; i < pokemons.length; i += 1) {
        expect(pokemonType).toHaveTextContent(type);
        fireEvent.click(nextPokemonButton);
      }
    });
  });
});
