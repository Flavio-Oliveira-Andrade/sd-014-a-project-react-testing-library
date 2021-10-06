import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter.test';
import pokemons from '../data';

import App from '../App';

const {
  name,
  foundAt,
  summary,
} = pokemons[0];

describe('07 - Teste o componente PokemonDetails.js', () => {
  test('se informações detalhadas do Pokemon são mostradas na tela', () => {
    renderWithRouter(<App />);
    const pokeDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(pokeDetails).toBeInTheDocument();
    userEvent.click(pokeDetails);
    expect(screen.getByText(`${name} Details`)).toBeInTheDocument();

    expect(pokeDetails).not.toBeInTheDocument();

    const sectionDetails = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(sectionDetails).toBeInTheDocument();

    expect(screen.getByText(summary)).toBeInTheDocument();
  });

  test('se existe uma seção com os mapas', () => {
    renderWithRouter(<App />);
    const pokeDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(pokeDetails).toBeInTheDocument();
    userEvent.click(pokeDetails);

    const locationTxt = screen.getByRole('heading', {
      name: `Game Locations of ${name}`,
      level: 2,
    });
    expect(locationTxt).toBeInTheDocument();

    foundAt.forEach((poke, index) => {
      const pokemonMap = screen.getAllByRole('img', {
        name: `${name} location`,
      });
      expect(pokemonMap[index]).toHaveAttribute('src', poke.map);
      expect(pokemonMap[index]).toHaveAttribute('alt', `${name} location`);
    });
  });

  test('se o usuário pode favoritar um pokémon', () => {
    renderWithRouter(<App />);
    const pokeDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(pokeDetails).toBeInTheDocument();
    userEvent.click(pokeDetails);

    const checkPokemon = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    userEvent.click(checkPokemon);

    const starIcon = screen.getByRole('img', {
      name: `${name} is marked as favorite`,
    });
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
