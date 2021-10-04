import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import App from '../App';

//  https://stackoverflow.com/questions/62544907/define-a-constant-instead-of-duplicating-this-literal-3-times-sonar
const POKEMON_NAME = 'pokemon-name';
const PROXIMO_POKEMON = 'Próximo pokémon';

describe('Requisito 5', () => {
  test('Página contém um heading h2 com o texto Encountered pokémons', () => {
    const setIs = App.setIsPokemonFavoriteById();
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ setIs }
      />,
    );
    const h2 = screen.getByRole('heading', {
      name: 'Encountered pokémons',
    });
    expect(h2).toBeInTheDocument();
  });
  test('Próximos Pokémons da lista devem ser mostrados, '
  + 'um a um, ao clicar sucessivamente no botão', () => {
    const setIs = App.setIsPokemonFavoriteById();
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ setIs }
      />,
    );
    const btnAll = screen.getByRole('button', {
      name: 'All',
    });
    expect(btnAll).toBeInTheDocument();
    const screenName = screen.getByTestId(POKEMON_NAME);
    pokemons.forEach((poke) => {
      const pokeName = poke.name;
      expect(screenName).toHaveTextContent(pokeName);
      const btnNext = screen.getByText(PROXIMO_POKEMON);
      fireEvent.click(btnNext);
    });
    const pokeName = pokemons[0].name;
    expect(screenName).toHaveTextContent(pokeName);
  });
  test('É mostrado apenas um Pokémon por vez', () => {
    const setIs = App.setIsPokemonFavoriteById();
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ setIs }
      />,
    );
    pokemons.forEach(() => {
      const pokemonsById = screen.getAllByTestId(POKEMON_NAME);
      expect(pokemonsById.length).toBe(1);
      const btnNext = screen.getByText(PROXIMO_POKEMON);
      fireEvent.click(btnNext);
    });
  });
  test('A Pokédex tem os botões de filtro.', () => {
    const setIs = App.setIsPokemonFavoriteById();
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ setIs }
      />,
    );
    const pokeTypes = [
      [['Electric'], [1]],
      [['Fire'], [2]],
      [['Bug'], [1]],
      [['Poison'], [1]],
      [['Psychic'], [2]],
      [['Normal'], [1]],
      [['Dragon'], [1]],
    ];

    const btnTypes = screen.getAllByTestId('pokemon-type-button');
    const btnElectric = screen.getByRole('button', {
      name: 'Electric',
    });
    const btnFire = screen.getByRole('button', {
      name: 'Fire',
    });
    const btnBug = screen.getByRole('button', {
      name: 'Bug',
    });
    const btnPoison = screen.getByRole('button', {
      name: 'Poison',
    });
    const btnPsychic = screen.getByRole('button', {
      name: 'Psychic',
    });
    const btnNormal = screen.getByRole('button', {
      name: 'Normal',
    });
    const btnDragon = screen.getByRole('button', {
      name: 'Dragon',
    });

    expect(btnElectric).toBeInTheDocument();
    expect(btnFire).toBeInTheDocument();
    expect(btnBug).toBeInTheDocument();
    expect(btnPoison).toBeInTheDocument();
    expect(btnPsychic).toBeInTheDocument();
    expect(btnNormal).toBeInTheDocument();
    expect(btnDragon).toBeInTheDocument();
    expect(btnTypes.length).toBe(pokeTypes.length);

    pokeTypes.forEach(([type, number]) => {
      const btnType = screen.getByRole('button', {
        name: type,
      });
      fireEvent.click(btnType);
      const pokeType = screen.getByTestId('pokemon-type');
      expect(pokeType).toHaveTextContent(type);
      const btnNext = screen.getByText(PROXIMO_POKEMON);
      for (let i = 1; i < number; i += 1) {
        fireEvent.click(btnNext);
        expect(pokeType).toHaveTextContent(type);
      }
      const btnAll = screen.getByRole('button', {
        name: 'All',
      });
      expect(btnAll).toBeVisible();
    });
  });
  test('A Pokédex contém um botão para resetar o filtro', () => {
    const setIs = App.setIsPokemonFavoriteById();
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ setIs }
      />,
    );
    const NUM_POKEMONS = 9;
    const btnNext = screen.getByText(PROXIMO_POKEMON);
    for (let i = 0; i < NUM_POKEMONS; i += 1) {
      const pokeName = screen.getByTestId(POKEMON_NAME);
      expect(pokeName).toHaveTextContent(pokemons[i].name);
      fireEvent.click(btnNext);
    }
    const btnAll = screen.getByText('All');
    expect(btnAll).toBeInTheDocument();
    fireEvent.click(btnAll);
    for (let i = 0; i < NUM_POKEMONS; i += 1) {
      const pokeName = screen.getByTestId(POKEMON_NAME);
      expect(pokeName).toHaveTextContent(pokemons[i].name);
      fireEvent.click(btnNext);
    }
  });
});
