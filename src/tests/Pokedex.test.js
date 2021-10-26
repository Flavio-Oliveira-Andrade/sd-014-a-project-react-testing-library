import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa o componente Pokedex.js', () => {
  test('Testa se página contém um heading h2 com o texto Encountered pokémons',
    () => {
      renderWithRouter(<App />);
      const headinglvl2 = screen.getByRole('heading', {
        level: 2,
        name: /Encountered pokémons/i,
      });
      expect(headinglvl2).toBeInTheDocument();
    });

  test('Testa se é exibido o próximo Pokémon da lista'
    + 'quando o botão Próximo pokémon é clicado',
  () => {
    renderWithRouter(<App />);
    const nextBtnPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(nextBtnPokemon);
    const pokemonName = screen.getByText(/charmander/i);
    expect(pokemonName).toBeInTheDocument();
  });

  test('Testa se é mostrado apenas um Pokémon por vez',
    () => {
      renderWithRouter(<App />);
      const pokemonTestId = screen.getAllByTestId(/pokemon-name/i);
      expect(pokemonTestId).toHaveLength(1);
    });

  test('testa se a Pokédex tem os botões de filtro',
    () => {
      renderWithRouter(<App />);
      const filterBtn = screen.getAllByTestId(/pokemon-type-button/i);
      filterBtn.forEach((button) => {
        expect(button).toBeInTheDocument();

        const buttonAll = screen.getByRole('button', {
          name: /all/i,
        });
        expect(buttonAll).toBeInTheDocument();

        const pokemonElectricBtn = screen.getByRole('button', {
          name: /electric/i,
        });
        expect(pokemonElectricBtn).toBeInTheDocument();

        const pokemonBugBtn = screen.getByRole('button', {
          name: /bug/i,
        });
        expect(pokemonBugBtn).toBeInTheDocument();
      });
    });

  test('Testa se a Pokédex contém um botão para resetar o filtro',
    () => {
      renderWithRouter(<App />);
      const resetBtn = screen.getByRole('button', {
        name: /all/i,
      });
      userEvent.click(resetBtn);
      const namePokemon = screen.getByText(pokemons[0].name);
      expect(namePokemon).toBeInTheDocument();
    });
});
