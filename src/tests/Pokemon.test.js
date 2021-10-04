import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import App from '../App';

describe('Requisito 6', () => {
  test('É renderizado um card com as informações de determinado pokémon', () => {
    const setIs = App.setIsPokemonFavoriteById();
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ setIs }
      />,
    );
    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const avgWeight = screen.getByTestId('pokemon-weight');
    const pokeImg = screen.getByRole('img');

    expect(pokeName).toHaveTextContent(pokemons[0].name);
    expect(pokeType).toHaveTextContent(pokemons[0].type);
    expect(avgWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokeImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokeImg.alt).toBe(`${pokemons[0].name} sprite`);
  });
});
