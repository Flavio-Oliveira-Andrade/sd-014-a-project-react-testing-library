import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import historyFunction from '../utils/historyFunction';

describe('Teste o componente FavoritePokemons', () => {
  test('ste se é exibido na tela a mensagem No favorite pokemon found,'
  + ' se a pessoa não tiver pokémons favoritos.', () => {
    historyFunction(<FavoritePokemons />);
    const favoritesText = screen.getByText('No favorite pokemon found');
    expect(favoritesText).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const mokPokemons = [{
      id: 4,
      name: 'Charmander',
      type: 'Fire',
      averageWeight: {
        value: '8.5',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    }];

    historyFunction(<FavoritePokemons pokemons={ mokPokemons } />);
    const pokemons = screen.getAllByTestId('pokemon-name');
    expect(pokemons).toHaveLength(1);
    expect(pokemons[0]).toHaveTextContent('Charmander');
  });
});
