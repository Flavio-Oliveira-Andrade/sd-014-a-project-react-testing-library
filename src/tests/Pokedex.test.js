import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const ARR_OF_ID = {
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
const QTD_OF_TYPES = 7;

describe('Teste o componente <Pokedex />', () => {
  it('se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ ARR_OF_ID }
      />,
    );
    expect(screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémon/i,
    })).toBeInTheDocument();
  });

  it('se exibe próximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ ARR_OF_ID }
      />,
    );
    const nextPokemonButton = screen.getByTestId('next-pokemon');
    expect(nextPokemonButton).toBeInTheDocument();
    pokemons.forEach((pokemon, index, pokes) => {
      userEvent.click(nextPokemonButton);
      const pokemonName = screen.getByTestId('pokemon-name');
      const nameOfLastPokemon = pokes[pokes.length - 1].name;
      if (!pokes[index + 1]) {
        expect(pokemon.name).toBe(nameOfLastPokemon);
      } else {
        expect(pokemonName.textContent).toBe(pokes[index + 1].name);
      }
    });
  });

  it('se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ ARR_OF_ID }
      />,
    );
    const p = screen.getByTestId('pokemon-name');
    expect(p).toBeInTheDocument();
  });

  it('se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ ARR_OF_ID }
      />,
    );
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons).toHaveLength(QTD_OF_TYPES);
  });

  it('se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ ARR_OF_ID }
      />,
    );
    const button = screen.getByRole('button', {
      name: /all/i,
    });
    expect(button).toBeInTheDocument();
  });
});
