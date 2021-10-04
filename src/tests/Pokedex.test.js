import React from 'react';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import Pokedex from '../components/Pokedex';

// ajuda master do braia
const isPokemonFavoriteById = {
  15: true,
  21: true,
};

beforeEach(() => {
  const history = createMemoryHistory();

  render(
    <Router history={ history }>
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />
    </Router>,
  );
});

describe('Teste o componente Pokedex.js', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const h2 = screen.getByRole('heading', { level: 2, name: /Encountered pokémons/i });
    expect(h2).toBeInTheDocument();
  });

  test('ver se o próximo Pokémon da lista muda quando botão do pokémon é clicado', () => {
    const button = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(button).toBeInTheDocument();

    pokemons.forEach(((pk, i) => {
      const PKM = 'pokemon-name';

      const pokemonName = screen.getByTestId(PKM).innerHTML;
      expect(pokemonName).toBe(pk.name);
      userEvent.click(button);

      if (i === (pokemons.length - 1)) {
        expect(pokemonName).toBe(pk.name);
        const firstPokemon = screen.getByTestId(PKM).innerHTML;
        expect(firstPokemon).toBe(pokemons[0].name);
      }
    }));
  });
});
