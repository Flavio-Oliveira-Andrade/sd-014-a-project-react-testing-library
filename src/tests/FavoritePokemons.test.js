import React from 'react';
import { screen, render } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

const pokemons = [
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
  },
];

describe('Requirement - 3 : FavoritePokemons', () => {
  it('should render "No favorite pokemon found" if favorite is empty', () => {
    render(<FavoritePokemons />);
    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
  });
  it('shout render all favorited pokemons', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const pokemonsNames = screen.getAllByTestId('pokemon-name');
    const pokemonsTypes = screen.getAllByTestId('pokemon-type');
    const pokemonsWeight = screen.getAllByTestId('pokemon-weight');
    expect(pokemonsNames.length).toBe(2);
    expect(pokemonsNames[0]).toBeInTheDocument();
    expect(pokemonsTypes[0]).toBeInTheDocument();
    expect(pokemonsWeight[0]).toBeInTheDocument();
    expect(pokemonsNames[0]).toHaveTextContent('Pikachu');
    expect(pokemonsTypes[0]).toHaveTextContent('Electric');
    expect(pokemonsWeight[0]).toHaveTextContent('Average weight: 6.0 kg');

    expect(pokemonsNames[1]).toBeInTheDocument();
    expect(pokemonsTypes[1]).toBeInTheDocument();
    expect(pokemonsWeight[1]).toBeInTheDocument();
    expect(pokemonsNames[1]).toHaveTextContent('Charmander');
    expect(pokemonsTypes[1]).toHaveTextContent('Fire');
    expect(pokemonsWeight[1]).toHaveTextContent('Average weight: 8.5 kg');
  });
});
