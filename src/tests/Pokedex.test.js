import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const POKEMON_TYPE = 'pokemon-type';
const isPokemonFavoriteById = {
  25: false,
  4: false,
  10: false,
  23: false,
  65: false,
  151: false,
  78: false,
  143: false,
  148: false,
};

describe('Testes do componente Pokedex', () => {
  it('Verifica se o componente contém um h2 com o texto "Encountered Pokémons"', () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });

    expect(heading).toBeInTheDocument();
  });

  it('Verifica se é exibido o próximo pokemon da lista quando o botão é clicado', () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const button = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(button).toBeInTheDocument();

    pokemons.forEach((pokemon, index, array) => {
      const pokemonName = screen.getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(button);
      if (index === array.length - 1) {
        const firstPokemon = screen.getByText(array[0].name);
        expect(firstPokemon).toBeInTheDocument();
      }
    });
  });

  it('Verifica se é mostrado apenas um pokemon por vez', () => {
    const TOTAL_BUTTONS = 9;

    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const details = screen.getAllByRole('link', { name: 'More details' });
    expect(details).toHaveLength(1);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(TOTAL_BUTTONS);

    buttons.forEach((button) => {
      userEvent.click(button);
      expect(details).toHaveLength(1);
    });
  });

  it('deve existir um botão de filtro para cada tipo de pokemon'
  + 'e um que mostra todos.', () => {
    const TOTAL_BUTTONS = 7;
    const types = [...new Set(pokemons.reduce(
      (acc, { type }) => [...acc, type], [],
    ))];

    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(typeButtons).toHaveLength(TOTAL_BUTTONS);

    typeButtons.forEach((button, index) => {
      expect(button).toHaveTextContent(types[index]);
    });
  });

  it('deve haver um botão com o texto "All" para resetar o filtro', () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const buttonNext = screen.getByText('Próximo pokémon');
    const buttonAll = screen.getByText('All');
    expect(buttonAll).toBeInTheDocument();

    userEvent.click(buttonAll);
    const pokemonType1 = screen.getByTestId(POKEMON_TYPE);
    expect(pokemonType1).toHaveTextContent('Electric');

    userEvent.click(buttonNext);
    const pokemonType2 = screen.getByTestId(POKEMON_TYPE);
    expect(pokemonType2).toHaveTextContent('Fire');
  });
});
