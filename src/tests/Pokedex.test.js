import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const isPokemonFavoriteById = {
  4: true,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: true,
};

const pokemonName = 'pokemon-name';

describe('Teste da Pokédex', () => {
  test('Verifica se há o texto Encountered Pokémons', () => {
    render(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />, { wrapper: BrowserRouter });

    const title = screen.getByRole('heading', { leve: 2, name: /Encountered pokémons/i });

    expect(title).toBeInTheDocument();
  });
  test('Verifica se o botão Próximo Pokémon funciona', () => {
    render(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />, { wrapper: BrowserRouter });

    let pokemon = screen.getByTestId(pokemonName);
    expect(pokemon).toHaveTextContent('Pikachu');

    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextBtn);

    pokemon = screen.getByTestId(pokemonName);
    expect(pokemon).toHaveTextContent('Charmander');

    pokemons.forEach(() => userEvent.click(nextBtn));

    pokemon = screen.getByTestId(pokemonName);
    expect(pokemon).toHaveTextContent('Charmander');
  });
  test('Verifica se renderiza apenas um pokémon por vez', () => {
    render(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />, { wrapper: BrowserRouter });

    const display = screen.getAllByTestId(pokemonName);

    expect(display).toHaveLength(1);
  });
  test('Verifica se renderiza apenas um pokémon por vez', () => {
    render(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />, { wrapper: BrowserRouter });

    const button = screen.getAllByTestId('pokemon-type-button');
    const pokemonsTypes = [...new Set(pokemons
      .reduce((types, { type }) => [...types, type], []))];
    const TYPES_QUANT = pokemonsTypes.length;

    expect(button).toHaveLength(TYPES_QUANT);
    expect(button[0]).toHaveTextContent(pokemonsTypes[0]);

    userEvent.click(screen.getByRole('button', { name: /all/i }));

    const showPokemon = screen.queryByTestId(pokemonName);

    expect(showPokemon).toBeInTheDocument();

    expect(screen.queryByRole('button', { name: pokemonsTypes[0] }));
  });
});
