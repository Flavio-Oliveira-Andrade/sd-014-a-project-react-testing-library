import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

describe('este o componente FavoritePokemons.js', () => {
  test('exibe "No favorite pokemon found", se a não tiver pokémons favoritos.', () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <FavoritePokemons />
      </Router>,
    );

    const paragraph = screen.getByText('No favorite pokemon found');
    expect(paragraph).toBeInTheDocument();
  });

  // Ideia de mock via props com Isaac monstrão <3
  test('should ', () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <FavoritePokemons pokemons={ pokemons } />
      </Router>,
    );

    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();
  });
});
