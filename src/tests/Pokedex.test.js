import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Verifica o componente <Pokedex />', () => {
  // Should I use a BeforeEach?
  const pokemonsNames = [
    'Pikachu', 'Charmander',
    'Caterpie', 'Ekans', 'Alakazam',
    'Mew', 'Rapidash', 'Snorlax', 'Dragonair',
  ];
  const pokemonNameTestId = 'pokemon-name';


  test('O texto de titulo "Encontered pokémons" está na pagina', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);

    const titleH2 = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(titleH2).toBeInTheDocument();
  });

  test('Funcionalidade do butao "Próximo pokemon', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);

    const nextBtn = screen.getByTestId('next-pokemon');
    // O botão deve conter o texto `Próximo pokémon`
    expect(nextBtn.innerHTML).toBe('Próximo pokémon');

    // Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
    const showingPokemonName = screen.getByTestId('pokemon-name');

    expect(showingPokemonName.innerHTML).toBe(pokemonsNames[0]);
    userEvent.click(nextBtn);
    expect(showingPokemonName.innerHTML).toBe(pokemonsNames[1]);
    userEvent.click(nextBtn);
    expect(showingPokemonName.innerHTML).toBe(pokemonsNames[2]);
    userEvent.click(nextBtn);
    expect(showingPokemonName.innerHTML).toBe(pokemonsNames[3]);
    userEvent.click(nextBtn);
    expect(showingPokemonName.innerHTML).toBe(pokemonsNames[4]);
    userEvent.click(nextBtn);
    expect(showingPokemonName.innerHTML).toBe(pokemonsNames[5]);
    userEvent.click(nextBtn);
    expect(showingPokemonName.innerHTML).toBe(pokemonsNames[6]);
    userEvent.click(nextBtn);
    expect(showingPokemonName.innerHTML).toBe(pokemonsNames[7]);
    userEvent.click(nextBtn);
    expect(showingPokemonName.innerHTML).toBe(pokemonsNames[8]);

    // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;
    userEvent.click(nextBtn);
    expect(showingPokemonName.innerHTML).toBe(pokemonsNames[0]);
  });

  test('Mostrado apena um pokemon por vez', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);

    // imagino que eu deveria usar um getAllBy...
    const pokemonName = screen.getAllByTestId('pokemon-name');
    expect(pokemonName.length).toBe(1);
  });

  it('Testa os butões de filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);

    // ?? com testar falta de repetição em testes ??
    const typeBtnArray = screen.getAllByTestId('pokemon-type-button');
    const expectedTypeBtnsN = 7;
    const BtnTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    expect(typeBtnArray.length).toBe(expectedTypeBtnsN);
    typeBtnArray.forEach((typeBtn, index) => expect(typeBtn.innerHTML).toBe(BtnTypes[index]));

    const fireTypeBtn = screen.getByRole('link', { name: 'Fire' });
    userEvent.click(fireTypeBtn);
    const pokemonName = screen.getAllByTestId('pokemon-name');
    expect(pokemonName).toBe(1)
    const detailsBtn = screen.getByTestId('next-pokemon');


  });
});
