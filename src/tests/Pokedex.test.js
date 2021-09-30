import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import renderWithRouter from './utils/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto "Encountered pokémons"', () => {
    const isPokemonFavoriteById = [];
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const headingText = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(headingText).toBeInTheDocument();
  });

  // test('Teste se é exibido o próximo Pokémon da lista quando o botão'
  //   + '"Próximo pokémon" é clicado', () => {
  //   const isPokemonFavoriteById = [];
  //   renderWithRouter(
  //     <Pokedex
  //       pokemons={ pokemons }
  //       isPokemonFavoriteById={ isPokemonFavoriteById }
  //     />,
  //   );

  //   const nextPokemonBtn = screen.getByTestId('next-pokemon');
  //   expect(nextPokemonBtn).toBeInTheDocument();
  //   pokemons.map((pokemon) =>
  //   { const
  //   );
  // });
});
