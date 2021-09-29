import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { FavoritePokemons } from '../components';

describe('FavoritePokemons.js test', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found,'
  + 'se a pessoa não tiver pokémons favoritos.', () => {
    render(<MemoryRouter><FavoritePokemons /></MemoryRouter>);

    const noPokemonText = screen.getByText(/No favorite pokemon found/i);
    expect(noPokemonText).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const pokemons = [{
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    }];
    render(<MemoryRouter><FavoritePokemons pokemons={ pokemons } /></MemoryRouter>);

    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon).toHaveLength(1);
    expect(pokemon[0]).toHaveTextContent('Pikachu');
  });
});
