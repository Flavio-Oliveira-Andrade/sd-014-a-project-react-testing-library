import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
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

describe('Testa o componente Pokedex', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const tituloH2 = screen.getByRole('heading',
      { name: /Encountered pokémons/i, level: 2 });
    expect(tituloH2).toBeInTheDocument();
  });
  // test('Exibe o próximo Pokémon quando o botão  é clicado', () => {
  //   renderWithRouter(<App />);
  //   const btProximoPok = screen.getByRole('button', { name: /Próximo pokémon/i });
  //   expect(btProximoPok).toBeInTheDocument();
  //   userEvent.click(btProximoPok);
  //   const botaoAll = screen.getByRole('button', { name: /próximo-pokemon/i });
  //   userEvent.click(botaoAll);

  //   expect(botaoAll).toBeInTheDocument();
  //   expect(botaoAll).toHaveTextContent('Charmander');
  // });
  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const verificaBotaoTipo = screen.getByRole('button', { name: /all/i });
    userEvent.click(verificaBotaoTipo);
    // const totalbotoes = 7;
    // const verificaBotaoTipo = screen.getAllByTestId('pokemon-type-button');
    // expect(verificaBotaoTipo).toHaveLength(totalbotoes);

    expect(screen.getByRole('button', { name: /All/i })).toBeVisible();
    // expect(screen.getAllByTestId('pokemon-type-button')[0]).toHaveTextContent('Electric');
    // expect(screen.getAllByTestId('pokemon-type-button')[1]).toHaveTextContent('Fire');
    // expect(screen.getAllByTestId('pokemon-type-button')[2]).toHaveTextContent('Bug');
    // expect(screen.getAllByTestId('pokemon-type-button')[3]).toHaveTextContent('Poison');
    // expect(screen.getAllByTestId('pokemon-type-button')[4]).toHaveTextContent('Psychic');
    // expect(screen.getAllByTestId('pokemon-type-button')[5]).toHaveTextContent('Normal');
    // expect(screen.getAllByTestId('pokemon-type-button')[6]).toHaveTextContent('Dragon');

    const conferePok = screen.getByRole('button', { name: /Electric/i });
    userEvent.click(conferePok);
    expect(screen.getAllByTestId('pokemon-type-button')[0]).toHaveTextContent('Electric');
    // expect(screen.getByTestId('pokemon-type').innerHTML).toBe('Electric');
    expect(conferePok).toBeInTheDocument();
    expect(conferePok).toHaveTextContent('Electric');
    const btProximoPok = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(btProximoPok);
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe('Electric');
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const totalPok = 7;
    const botaoAll = screen.getAllByRole('button')[0];
    userEvent.click(botaoAll);
    expect(botaoAll).toHaveTextContent('All');
    const contaPok = screen.getAllByTestId('pokemon-type-button');
    expect(contaPok).toHaveLength(totalPok);
  });
});
