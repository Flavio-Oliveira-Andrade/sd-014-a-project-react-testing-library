import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import App from '../App';

describe('Requisito 5', () => {
  test('Página contém um heading h2 com o texto Encountered pokémons', () => {
    const setIs = App.setIsPokemonFavoriteById();
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ setIs }
      />);
    const h2 = screen.getByRole('heading', {
      name: 'Encountered pokémons',
    });
    expect(h2).toBeInTheDocument();
  });
})
