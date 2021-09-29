import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../components';
import pokemons from '../data';

const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
  acc[pokemon.id] = [].includes(pokemon.id);
  return acc;
}, {});

const typesPokemons = pokemons.reduce((acc, cur) => {
  if (acc.includes(cur.type)) return acc;
  return acc.concat(cur.type);
}, []);

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém o texto Encountered pokémons', async () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavorite }
      />,
    );
    const headingH2 = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(headingH2).toBeInTheDocument();
  });
});

describe('é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
  test('O botão deve conter o texto Próximo pokémon;', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavorite }
      />,
    );
    const buttonText = screen.getByText('Próximo pokémon');
    expect(buttonText).toBeInTheDocument();
  });
  test('Os próximos Pokémons da lista devem ser mostrados', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavorite }
      />,
    );
    const buttonText = screen.getByText('Próximo pokémon');
    expect(buttonText).toBeInTheDocument();
    pokemons.forEach((pokemon) => {
      const testIdPokemon = screen.getAllByTestId('pokemon-type');
      // apenas um por vez
      expect(testIdPokemon.length).toBe(1);
      const namePokemon = screen.getByText(pokemon.name);
      expect(namePokemon).toBeInTheDocument();
      userEvent.click(buttonText);
    });
    const namePokemon = screen.getByText(pokemons[0].name);
    expect(namePokemon).toBeInTheDocument();
  });
});

describe('Teste o Teste se a Pokédex tem os botões de filtro', () => {
  test('Deve existir um botão de filtragem para cada tipo de Pokémon', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavorite }
      />,
    );
    const buttonTextAll = screen.getByText('All');
    userEvent.click(buttonTextAll);
    expect(buttonTextAll).toBeInTheDocument();
    typesPokemons.forEach((type) => {
      const buttonText = screen.getByRole('button', {
        name: type,
      });
      const LENGTH_BUTTONS_TESTID = 7;
      const allDataIdButton = screen.getAllByTestId('pokemon-type-button');
      expect(allDataIdButton).toHaveLength(LENGTH_BUTTONS_TESTID);
      expect(buttonText).toBeInTheDocument();
    });
  });
});
