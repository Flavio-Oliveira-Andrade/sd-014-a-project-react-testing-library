import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Verifica o componente <Pokedex />', () => {
  test('O texto de titulo "Encontered pokémons" está na pagina', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);

    const titleH2 = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(titleH2).toBeInTheDocument();
  });

  test('Funcionalidade do butao "Próximo pokemon', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);

    const pokemonsNames = [
      'Pikachu', 'Charmander',
      'Caterpie', 'Ekans', 'Alakazam',
      'Mew', 'Rapidash', 'Snorlax', 'Dragonair',
    ];

    const showingPokemonName = screen.getByTestId('pokemon-name');
    expect(showingPokemonName.innerHTML).toBe(pokemonsNames[0]);

    const nextBtn = screen.getByTestId('next-pokemon');
    userEvent.click(nextBtn);
    expect(showingPokemonName.innerHTML).toBe(pokemonsNames[1]);
  });
});
