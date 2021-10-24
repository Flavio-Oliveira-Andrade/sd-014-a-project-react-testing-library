import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Verifica o componente <Pokedex />', () => {
  // Should I use a BeforeEach?
  const pokemonsNames = pokemons.map((pokemon) => pokemon.name);
  const BtnTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
  const pokemonNameTestId = 'pokemon-name';

  beforeEach(() => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);
  });

  test('O texto de titulo "Encontered pokémons" está na pagina', () => {
    const titleH2 = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(titleH2).toBeInTheDocument();
  });

  test('Funcionalidade do butao "Próximo pokemon', () => {
    // O botão deve conter o texto `Próximo pokémon`
    const nextBtn = screen.getByTestId('next-pokemon');
    expect(nextBtn.innerHTML).toBe('Próximo pokémon');

    // Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
    const showingPokemonName = screen.getByTestId(pokemonNameTestId);
    pokemonsNames.forEach((pokemon) => {
      expect(showingPokemonName.innerHTML).toBe(pokemon);
      userEvent.click(nextBtn);
    });

    // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;
    expect(showingPokemonName.innerHTML).toBe(pokemonsNames[0]);
  });

  test('Mostrado apena um pokemon por vez', () => {
    const ShowingPokemonNames = screen.getAllByTestId(pokemonNameTestId);
    expect(ShowingPokemonNames.length).toBe(1);
  });

  it('Testa os butões de filtro', () => {
    // - Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
    const typeBtns = screen.getAllByTestId('pokemon-type-button');
    const expectedTypeBtnsN = 7;
    expect(typeBtns.length).toBe(expectedTypeBtnsN);
    // - O texto do botão deve corresponder ao `nome do tipo`, ex. `Psychic`;
    typeBtns.forEach((typeBtn, index) => expect(typeBtn.innerHTML).toBe(BtnTypes[index]));

    // - A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
    const firePokemons = pokemons.filter((pokemon) => pokemon.type === 'Fire');
    const fireBtn = screen.getByRole('button', { name: /fire/i });
    const nextBtn = screen.getByTestId('next-pokemon');
    const showingPokemonName = screen.getByTestId(pokemonNameTestId);
    userEvent.click(fireBtn);
    firePokemons.forEach((firePokemon) => {
      expect(showingPokemonName.innerHTML).toBe(firePokemon.name);
      userEvent.click(nextBtn);
    });

    // - Teste se a Pokédex contém um botão para resetar o filtro
    const allBtn = screen.getByRole('button', { name: 'All' });
    userEvent.click(allBtn);
    pokemonsNames.forEach((pokemon) => {
      expect(showingPokemonName.innerHTML).toBe(pokemon);
      userEvent.click(nextBtn);
    });
  });
});
