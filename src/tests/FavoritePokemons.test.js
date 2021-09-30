import React from 'react';
import { render, screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';

const favoritePokeData = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
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
  },
];

describe('Verifica o funcionamento do componente FavoritePokemons', () => {
  it('ao entrar na página, deve exibir "No favorite pokemon found",'
  + ' se não houver pokémons favoritados', () => {
    render(<FavoritePokemons />);
    const notFoundMessage = screen.getByText('No favorite pokemon found');
    expect(notFoundMessage).toBeInTheDocument();
  });
  it('ao entrar na página, deve exibir todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ favoritePokeData } />);
    const pikachu = screen.getByText('Pikachu');
    const charmander = screen.getByText('Charmander');
    const caterpie = screen.getByText('Caterpie');
    expect(pikachu).toBeInTheDocument();
    expect(charmander).toBeInTheDocument();
    expect(caterpie).toBeInTheDocument();
  });
});
