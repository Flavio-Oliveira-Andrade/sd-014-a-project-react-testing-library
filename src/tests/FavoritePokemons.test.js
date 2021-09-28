import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './helper/renderWithRouter';

describe('Componente Favorite Pokemons', () => {
  it(`É exibida na tela a mensagem "No favorite pokemon found",
      senão tiver pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons />);
    const message = screen.getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });

  it('São exibidos todos os cards de pokémons favoritados.', () => {
    const mockOfPokemons = [{
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
    }];
    renderWithRouter(<FavoritePokemons pokemons={ mockOfPokemons } />);
    const pokemons = screen.getAllByTestId('pokemon-name');
    expect(pokemons).toHaveLength(2);
    expect(pokemons[0]).toHaveTextContent('Pikachu');
    expect(pokemons[1]).toHaveTextContent('Charmander');
  });
});
