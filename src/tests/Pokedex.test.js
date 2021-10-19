import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../rendreWithRouter';
import App from '../App';
import pokemons from '../data';

const POKEMON_NAME = 'pokemon-name';

describe('Testa o componente Pokedex.js', () => {
  it('testa se página contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const heading = screen.getByRole('heading', {
      name: /Encountered pokémons/i, level: 2 });

    expect(heading).toBeInTheDocument();
  });

  it('testa se é exibido o próximo Pokémon quando o botão "Próximo" é clicado.', () => {
    renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      const namePokemon = screen.getByText(pokemon.name);
      expect(namePokemon).toBeInTheDocument();

      const pokemonList = screen.getAllByTestId(POKEMON_NAME);
      expect(pokemonList).toHaveLength(1);

      const btnNextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
      expect(btnNextPokemon).toBeInTheDocument();

      userEvent.click(btnNextPokemon);
    });

    const namePokemon = screen.getByText(pokemons[0].name);
    expect(namePokemon).toBeInTheDocument();
  });

  it('testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const btn = [...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];

    const allButtons = screen.getAllByTestId(/pokemon-type-button/i);
    expect(allButtons).toHaveLength(btn.length);

    btn.forEach((button) => {
      const filterButton = screen.getByRole('button', { name: new RegExp(button, 'i') });
      // RegExp é um classe que representa uma regex
      expect(filterButton).toBeInTheDocument();
    });
  });

  it('testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const btnAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(btnAll);
    const namePokemon = screen.getByText(pokemons[0].name);
    expect(namePokemon).toBeInTheDocument();
  });
});
