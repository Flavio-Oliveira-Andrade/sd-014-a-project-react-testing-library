import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';

import { Pokedex } from '../components';
import pokemons from '../data';
import isFavoriteById from './mock/mockFavorites';

describe('Testando o componente Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavoriteById }
    />);
  });
  const idName = 'pokemon-name';
  it('página contém um heading h2 com o texto Encountered pokémons.', () => {
    const heading = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(heading).toBeInTheDocument();
  });
  it('é exibido o próximo Pokémon da lista'
  + ' quando o botão Próximo pokémon é clicado.', () => {
    const button = screen.getByRole('button', { name: 'Próximo pokémon' });
    const indexLastPokemon = pokemons.length - 1;
    expect(button).toBeInTheDocument();
    pokemons.forEach((pokemon, index) => {
      const pokemonName = screen.getByTestId(idName).innerHTML;
      expect(pokemonName).toBe(pokemon.name);
      userEvent.click(button);
      console.log(pokemonName);
      if (index === indexLastPokemon) {
        const firstPokemon = screen.getByTestId(idName).innerHTML;
        expect(pokemonName).toBe(pokemon.name);
        expect(firstPokemon).toBe(pokemons[0].name);
      }
    });
  });
  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const PokemonName = screen.getAllByTestId('pokemon-name');
    expect(PokemonName.length).toBe(1);
  });
  it('Teste se a Pokédex tem os botões de filtro.', () => {
    const filtraTipos = [...new Set(pokemons
      .reduce((types, { type }) => [...types, type], []))];
      // https://dicasdejavascript.com.br/javascript-como-remover-valores-repetidos-de-um-array/
    const buttons = screen.getAllByTestId('pokemon-type-button');
    buttons.forEach((btn, index) => expect(btn.innerHTML).toBe(filtraTipos[index]));
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
  });
  it('a Pokédex contém um botão para resetar o filtro', () => {
    const buttonNext = screen.getByRole('button', { name: 'Próximo pokémon' });
    const buttonAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(buttonNext);
    userEvent.click(buttonAll);
    const pokemonName = screen.getByTestId(idName).innerHTML;
    expect(pokemonName).toBe(pokemons[0].name);
    // Obrigado ao DEUS ROD pinheiro por me livrar do sofrimento
  });
});
