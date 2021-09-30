import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';

import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const isFavoriteIdPokemon = {
  0: true,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};
const maxTypes = 7;

describe('Teste o componente <Pokedex.js />.', () => {
  it('Teste se página contém h2 com o texto: "Encountered pokémons".', () => {
    const { screen } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavoriteIdPokemon }
    />);

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(h2).toBeInTheDocument();
  });

  it('Teste se aparece o próximo Pokémon da listado clickar em "Próximo pokémon"', () => {
    const { screen } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavoriteIdPokemon }
    />);

    const button = screen.getByRole('button', { name: /Próximo pokémon/i });

    pokemons.forEach((pokemon) => {
      const nextPokemon = screen.getByText(pokemon.name);
      fireEvent.click(button);
      expect(nextPokemon).toBeDefined();
    });
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { screen } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavoriteIdPokemon }
    />);

    pokemons.forEach((pokemon) => {
      const button = screen.getByRole('button', { name: pokemon.type });

      fireEvent.click(button);

      const pokemonType = screen.queryByTestId('pokemon-type');
      expect(pokemonType).toBeDefined();
    });
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    const { screen } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavoriteIdPokemon }
    />);

    const allButtonsType = screen.queryAllByTestId('pokemon-type-button');
    expect(allButtonsType).toHaveLength(maxTypes);

    allButtonsType.forEach((buttonType) => {
      // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
      expect(buttonType).toBeDefined();
      expect(buttonType).toBeInTheDocument();

      // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
      fireEvent.click(buttonType);
      // O texto do botão deve corresponder ao nome do tipo, ex. Psychic
      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonType).toBeInTheDocument();
    });
  });

  it('Teste se o botão All precisa estar sempre visível.', () => {
    const { screen } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavoriteIdPokemon }
    />);

    // O botão All precisa estar sempre visível.
    pokemons.forEach((pokemon) => {
      fireEvent.click(screen.getByRole('button', { name: pokemon.type }));
      const buttonAll = screen.getByRole('button', { name: /all/i });
      expect(buttonAll).toBeInTheDocument();
      expect(buttonAll).toBeVisible();
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro.', () => {
    const { screen } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavoriteIdPokemon }
    />);

    const buttonAll = screen.getByRole('button', { name: /all/i });
    const buttonNext = screen.getByRole('button', { name: /próximo /i });
    const pokemonCurrent = screen.getByTestId('pokemon-name');

    // O texto do botão deve ser All.
    expect(buttonAll).toHaveTextContent('All');

    // A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado.
    expect(pokemonCurrent.innerHTML).toEqual(pokemons[0].name);
    fireEvent.click(buttonNext);
    expect(pokemonCurrent.innerHTML).toEqual(pokemons[1].name);
    fireEvent.click(buttonNext);
    expect(pokemonCurrent.innerHTML).toEqual(pokemons[2].name);

    // O filtro selecionado deverá ser All deve resetar o state
    fireEvent.click(buttonAll);
    expect(pokemonCurrent.innerHTML).toEqual(pokemons[0].name);
  });
});
