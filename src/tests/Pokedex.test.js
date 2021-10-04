import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const pokemonName = 'pokemon-name';

describe('Testando o componente Pokedex', () => {
  test('Teste se página contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const pokemonEncountred = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(pokemonEncountred).toBeInTheDocument();
  });
});

describe('Teste se é exibido o próximo Pokémon da lista quando'
+ 'o botão Próximo pokémon é clicado', () => {
  test('O botão deve conter o texto "Próximo pokémon"', () => {
    renderWithRouter(<App />);
    const btnProximo = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(btnProximo).toBeInTheDocument();
  });

  test('O primeiro Pokémon da lista deve ser mostrado'
  + 'ao clicar no botão, se estiver no último Pokémon da lista;', () => {
    renderWithRouter(<App />);

    const ultimoPokemon = screen.getByTestId(pokemonName);
    const btnProximo = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });

    userEvent.click(btnProximo);

    const primeiroPokemon = screen.getAllByTestId(pokemonName);
    expect(ultimoPokemon).not.toEqual(primeiroPokemon);
  });

  test('Verifica se mostra um Pokemon por vez', () => {
    renderWithRouter(<App />);

    const poke = screen.getAllByTestId(pokemonName);
    expect(poke).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: 'All' });
    const btnEletric = screen.getByRole('button', { name: 'Electric' });
    const btnFire = screen.getByRole('button', { name: 'Fire' });
    const btnBug = screen.getByRole('button', { name: 'Bug' });
    const btnPoison = screen.getByRole('button', { name: 'Poison' });
    const btnPsychic = screen.getByRole('button', { name: 'Psychic' });
    const btnNormal = screen.getByRole('button', { name: 'Normal' });
    const btnDragon = screen.getByRole('button', { name: 'Dragon' });

    expect(btnAll).toBeInTheDocument();
    expect(btnEletric).toBeInTheDocument();
    expect(btnFire).toBeInTheDocument();
    expect(btnBug).toBeInTheDocument();
    expect(btnPoison).toBeInTheDocument();
    expect(btnNormal).toBeInTheDocument();
    expect(btnPsychic).toBeInTheDocument();
    expect(btnDragon).toBeInTheDocument();
  });

  test('A partir da seleção de um botão de tipo, a Pokédex deve'
  + 'circular somente pelos pokémons daquele tipo', () => {
    renderWithRouter(<App />);
    const filterButton = screen.getAllByTestId('pokemon-type-button');

    userEvent.click(filterButton[0]);

    const filterPokemon = screen.getByTestId('pokemon-type');
    expect(filterPokemon.innerHTML).toBe(filterButton[0].innerHTML);
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: 'All' });

    userEvent.click(btnAll);
    const pokemon = screen.getAllByTestId(pokemonName);
    const proximo = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(proximo);
    const pokeProx = screen.getByTestId(pokemonName).innerHTML;

    expect(pokemon).not.toEqual(pokeProx);
  });
});
