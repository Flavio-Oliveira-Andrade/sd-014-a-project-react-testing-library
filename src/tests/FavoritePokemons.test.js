import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';

const mockPokemon = [{
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
  id: 10,
  name: 'Caterpie',
  type: 'Bug',
  averageWeight: {
    value: '2.9',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png',
}];

describe('teste o componente Favorite Pokemons', () => {
  test('se é exibido na tela a mensagem No favorite pokemon found', () => {
    render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );

    const noFavorite = screen.getByText(/No favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });

  test('se é exibido todos os cards de pokémons favoritados', () => {
    render(
      <MemoryRouter>
        <FavoritePokemons pokemons={ mockPokemon } />
      </MemoryRouter>,
    );
    const favoritePokemon = screen.getAllByTestId('pokemon-name');
    expect(favoritePokemon).toHaveLength(2);
    expect(favoritePokemon[0]).toHaveTextContent('Pikachu');
    expect(favoritePokemon[1]).toHaveTextContent('Caterpie');
  });
});
