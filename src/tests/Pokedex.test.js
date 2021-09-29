import React from 'react';
import { screen } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import RenderWithRouter from '../RenderWithRouter';

describe('Testes para o Pokedex.js', () => {
  test('Testa se existe um Heading h2 com o texto "Encountered pokémons"', () => {
    RenderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById="2" />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(heading).toBeInTheDocument();
  });
});
