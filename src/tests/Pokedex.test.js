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

    const pokemonName = 'pokemon-name';

    let pokemon = screen.getByTestId(pokemonName);
    expect(pokemon).toHaveTextContent('Pikachu');

    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextBtn);

    pokemon = screen.getByTestId(pokemonName);
    expect(pokemon).toHaveTextContent('Charmander');

    userEvent.click(nextBtn);
    userEvent.click(nextBtn);
    userEvent.click(nextBtn);
    userEvent.click(nextBtn);
    userEvent.click(nextBtn);
    userEvent.click(nextBtn);
    userEvent.click(nextBtn);
    userEvent.click(nextBtn);

    pokemon = screen.getByTestId(pokemonName);
    expect(pokemon).toHaveTextContent('Pikachu');
  });
  test('Verifica se renderiza apenas um pokémon por vez', () => {
    render(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />, { wrapper: BrowserRouter });

    const display = screen.getAllByTestId('pokemon-name');

    expect(display).toHaveLength(1);
  });
  test('Verifica se renderiza apenas um pokémon por vez', () => {
    render(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />, { wrapper: BrowserRouter });

    const button = screen.getAllByTestId('pokemon-type-button');
    const TYPES_QUANT = 7;

    expect(button).toHaveLength(TYPES_QUANT);

    const repeat = button.reduce((acc, type) => {
      if (acc) return;
      let counter = 0;
      console.log(type);
      button.forEach((element) => { if (element.text === type.text) counter += 1; });
      acc = counter >= 2;
      return acc;
    }, false);
    console.log(repeat);
  });
});
