import React from 'react';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import Pokedex from '../components/Pokedex';

// mockada monstra por Pedro Alles (T13).
const isPokemonFavoriteById = {
  4: true,
  25: true,
};

beforeEach(() => {
  const history = createMemoryHistory();

  render(
    <Router history={ history }>
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />
    </Router>,
  );
});

/* const ultimoPokemon = (() => {
  if (screen.getByText('Dragonair')) return true;
}); */

describe('Teste o componente Pokedex.js', () => {
  test('página contém um heading h2 com o texto Encountered pokémons ', () => {
    const h2 = screen.getByRole('heading', { level: 2, name: 'Encountered pokémons' });

    expect(h2).toBeInTheDocument();
  });

  test('exibe o próximo Pkmn da lista quando o botão Próximo pokémon é clicado ', () => {
    // O botão deve conter o texto Próximo pokémon;
    const button = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(button).toBeInTheDocument();

    // Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
    pokemons.forEach(((pkmn, i) => {
      const id = 'pokemon-name';
      const lastPokemonIndex = pokemons.length - 1;

      const pokemonName = screen.getByTestId(id).innerHTML;
      expect(pokemonName).toBe(pkmn.name);
      userEvent.click(button);

      // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;
      // Ajuda do Isaac Monstrão para arrumar meu IF <3
      if (i === lastPokemonIndex) {
        expect(pokemonName).toBe(pkmn.name); // Dragonair
        const firstPokemon = screen.getByTestId(id).innerHTML; // Pikachu
        expect(firstPokemon).toBe(pokemons[0].name);
      }
    }));
  });

  test('é mostrado apenas um Pokémon por vez', () => {
    const div = screen.getAllByTestId('pokemon-name');
    expect(div).toHaveLength(1);
  });

  test('a Pokédex tem os botões de filtro. ', () => {
    // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.

    const pkmnTypeMap = pokemons.map((pkmn) => pkmn.type);
    // https://dicasdejavascript.com.br/javascript-como-remover-valores-repetidos-de-um-array/
    const pkmnTypes = [...new Set(pkmnTypeMap)];

    const buttonTypes = screen.getAllByTestId('pokemon-type-button');
    buttonTypes.forEach((btn, i) => {
      expect(btn.innerHTML).toBe(pkmnTypes[i]);
    });

    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
    const renderPkmn = screen.getByText('Pikachu');
    expect(renderPkmn).toBeInTheDocument();
  });
});
