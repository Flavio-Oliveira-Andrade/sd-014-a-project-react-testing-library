import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './novoTeste/ renderWithRouter';

import App from '../App';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const isPokemonFavoriteById = {
  25: false,
  4: false,
  10: false,
  23: false,
  65: false,
  151: false,
  78: false,
  143: false,
  148: false,
};

describe('Teste o componente `<Pokedex.js />`', () => {
  test('Teste se página contém um heading com o texto `Encountered pokémons`', () => {
    renderWithRouter(<App />);

    expect(screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    }))
      .toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão'
  + '`Próximo pokémon` é clicado', () => {
    renderWithRouter(<App />);

    expect(screen.getByRole('button', {
      name: /Próximo pokémon/i,
    }))
      .toBeInTheDocument();
  });
  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    expect(screen.getAllByRole('link', {
      name: 'More details',
    }))
      .toHaveLength(1);
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const tipobotao = screen.getByRole('button', {
      name: /All/i });
    userEvent.click(tipobotao);

    expect(tipobotao).toHaveTextContent('All');
    expect(screen.getByRole('button', { name: /All/i })).toBeVisible();

    const conferePok = screen.getByRole('button', { name: /Electric/i });
    userEvent.click(conferePok);
    expect(screen.getAllByTestId('pokemon-type-button')[0]).toHaveTextContent('Electric');

    expect(conferePok).toBeInTheDocument();
    expect(conferePok).toHaveTextContent('Electric');
    const btProximoPok = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(btProximoPok);
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe('Electric');
  });

  test('', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const totalPokemons = 7;
    const btnAll = screen.getAllByRole('button')[0];
    userEvent.click(btnAll);

    expect(btnAll).toHaveTextContent('All');
    const contaPokemons = screen.getAllByTestId('pokemon-type-button');
    expect(contaPokemons).toHaveLength(totalPokemons);
  });
});
