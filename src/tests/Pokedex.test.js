import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

const pokemonsType = () => pokemons.reduce((acc, pokemon) => {
  if (!acc.find((ac) => pokemon.type === ac.type)) {
    return [...acc, {
      type: pokemon.type,
      filteredPokemons: (pokemons.filter((poke) => poke.type === pokemon.type)),
    }];
  }
  return acc;
}, []);

describe('Testa o componente "Pokedex', () => {
  test('Verifica se página contém um heading `h2`'
  + 'com o texto `Encountered pokémons`', () => {
    renderWithRouter(<App />);

    const encounteredText = screen.getByRole('heading', {
      level: 2,
      name: /encountered/i,
    });
    expect(encounteredText).toBeInTheDocument();
  });

  test('Verifica se é exibido o próximo Pokémon da'
  + 'lista quando o botão `Próximo pokémon` é clicado.', () => {
    renderWithRouter(<App />);

    const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextPokemonButton).toBeInTheDocument();

    let encounteredPokemon = '';
    pokemons.forEach((pokemon) => {
      encounteredPokemon = screen.getByText(pokemon.name);
      expect(encounteredPokemon).toBeInTheDocument();
      userEvent.click(nextPokemonButton);
    });

    encounteredPokemon = screen.getByText(pokemons[0].name);
    userEvent.click(nextPokemonButton);
    expect(encounteredPokemon).toBeInTheDocument();
  });

  test('Verifica se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const buttonType = screen.getByText(/all/i);
    expect(buttonType).toBeInTheDocument();

    const buttonsType = screen.getAllByTestId('pokemon-type-button');
    const pokemonType = pokemonsType();

    const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/i });

    buttonsType.forEach((button, index) => {
      expect(button).toHaveTextContent(pokemonType[index].type);
      userEvent.click(button);
      const { filteredPokemons } = pokemonType[index];
      if (filteredPokemons.length > 1) {
        pokemonType[index].filteredPokemons.forEach((pokemon) => {
          const showedPokemon = screen.getByText(pokemon.name);
          expect(showedPokemon).toBeInTheDocument();
          userEvent.click(nextPokemonButton);
        });
      }
    });
  });

  test('Verificar se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();

    userEvent.click(allButton);

    const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextPokemonButton).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const shownPokemon = screen.getByText(pokemon.name);
      expect(shownPokemon).toBeInTheDocument();
      userEvent.click(nextPokemonButton);
    });
  });
});
