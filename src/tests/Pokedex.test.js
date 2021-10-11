import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Test Pokedex component', () => {
  const POKEMON_NAME = 'pokemon-name';

  const pokeFunction = (pokemon, nextButton) => {
    pokemon.forEach(({ name }) => {
      const pokemonName = screen.getByTestId(POKEMON_NAME);

      expect(pokemonName).toBeInTheDocument();
      expect(pokemonName).toHaveTextContent(name);

      userEvent.click(nextButton);
    });
  };

  it('contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(heading).toBeInTheDocument();
  });

  it('exibe o próximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });

    expect(nextButton).toBeInTheDocument();
    pokeFunction(pokemons, nextButton);

    const firstPokemonName = screen.getByTestId(POKEMON_NAME);

    expect(firstPokemonName).toBeInTheDocument();
    expect(firstPokemonName).toHaveTextContent(pokemons[0].name);
  });

  it('mostra apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemonList = screen.getAllByTestId(POKEMON_NAME);

    expect(pokemonList).toHaveLength(1);
  });

  it('a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    const nextButton = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(nextButton).toBeInTheDocument();

    const types = pokemons.reduce(
      (acc, { type }) => (acc.includes(type) ? acc : [...acc, type]),
      [],
    );

    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(filterButtons).toHaveLength(types.length);

    types.forEach((type) => {
      const button = screen.getByRole('button', { name: type });

      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(type);

      userEvent.click(button);

      const filteredPokemons = pokemons.filter(
        (pokemon) => pokemon.type === type,
      );

      if (filteredPokemons.length === 1) {
        expect(nextButton).toBeDisabled();
      } else {
        pokeFunction(filteredPokemons, nextButton);
      }

      expect(allButton).toBeInTheDocument();
    });
  });

  it('a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: 'All' });

    expect(allButton).toBeInTheDocument();

    const nextButton = screen.getByTestId('next-pokemon');

    pokeFunction(pokemons, nextButton);

    userEvent.click(screen.getByRole('button', { name: 'Electric' }));
    expect(screen.getByTestId(POKEMON_NAME)).toHaveTextContent(/pikachu/i);
    expect(nextButton).toBeDisabled();

    userEvent.click(allButton);
    pokeFunction(pokemons, nextButton);
  });
});
