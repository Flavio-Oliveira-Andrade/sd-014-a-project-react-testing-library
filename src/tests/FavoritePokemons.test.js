import React from 'react';
import { screen } from '@testing-library/react';
import renderWithReactRoute from './renderWithReactRoute';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Componente Favorite Pokemons', () => {
  it('Teste se é exibido na tela a mensagem "No favorite pokemon found"', () => {
    renderWithReactRoute(<FavoritePokemons />);
    const message = screen.getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const mockedPokemons = [{
      id: 65,
      name: 'Alakazam',
      type: 'Psychic',
      averageWeight: {
        value: '48.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png',
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
    }];
    renderWithReactRoute(<FavoritePokemons pokemons={ mockedPokemons } />);
    const pokemons = screen.getAllByTestId('pokemon-name');
    expect(pokemons).toHaveLength(2);
    expect(pokemons[0]).toHaveTextContent('Alakazam');
    expect(pokemons[1]).toHaveTextContent('Mew');
  });
});
