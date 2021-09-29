import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import getPokemonsTypes from '../utils/getPokemonsTypes';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const nextPokemonButton = 'Próximo pokémon';

describe('Testa o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons',
    () => {
      renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ [] } />);
      expect(screen.getByRole('heading', { level: 2, name: /Encountered pokémons/i }))
        .toBeInTheDocument();
    });

  test('Testa se é exibido o próximo Pokémon quando o botão Próximo pokémon é clicado',
    () => {
      const firstPokemon = pokemons[0].name;
      renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ [] } />);
      const nextButton = screen.getByRole('button', { name: nextPokemonButton });
      expect(nextButton).toBeInTheDocument();

      pokemons.forEach(({ name }) => {
        expect(screen.getByText(name)).toBeInTheDocument();
        userEvent.click(nextButton);
      });

      expect(screen.getByText(firstPokemon)).toBeInTheDocument();
    });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ [] } />);
    const nextButton = screen.getByRole('button', { name: nextPokemonButton });
    let onScreenPokemons;

    pokemons.forEach(({ name }) => {
      onScreenPokemons = screen.getAllByTestId('pokemon-name');
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(onScreenPokemons.length).toBe(1);
      userEvent.click(nextButton);
    });
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ [] } />);
    const allButton = screen.getByRole('button', { name: 'All' });
    const nextButton = screen.getByRole('button', { name: nextPokemonButton });
    const types = getPokemonsTypes(pokemons);

    const typesButtons = screen.getAllByTestId('pokemon-type-button');
    expect(typesButtons.length).toBe(Object.keys(types).length);

    expect(allButton).toBeInTheDocument();

    Object.keys(types).forEach((type) => {
      const typeButton = screen.getByRole('button', { name: type });
      userEvent.click(typeButton);
      for (let index = 1; index <= types[type]; index += 1) {
        const typeOnScreen = screen.getByTestId('pokemon-type');
        expect(typeOnScreen).toHaveTextContent(type);
        expect(allButton).toBeInTheDocument();
        userEvent.click(nextButton);
      }
    });
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
  });
});
