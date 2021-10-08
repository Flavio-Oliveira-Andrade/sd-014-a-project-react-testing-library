import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

const buttonsLength = 9;

describe('Requisito 5, testa o Pokedex.js', () => {
  it('Testa se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);
    const headingText = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });

    expect(headingText).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Pokémon da lista'
    + 'quando o botão Próximo pokémon é clicado.', () => {
    renderWithRouter(<App />);
    const pokemonButton = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });

    expect(pokemonButton).toBeInTheDocument();

    userEvent.click(pokemonButton);
    const pokemonName = screen.getByText(/charmander/i);

    expect(pokemonName).toBeInTheDocument();
  });

  it('Testa se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemonsLength = screen.getAllByTestId('pokemon-name');

    expect(pokemonsLength).toHaveLength(1);
  });

  it('Testa se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const getButtons = screen.getAllByRole('button');
    expect(getButtons).toHaveLength(buttonsLength);

    const filterButton = screen.getAllByTestId('pokemon-type-button');
    filterButton.forEach((button) => {
      expect(button).toBeInTheDocument();
    });

    const allButton = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allButton).toBeInTheDocument();

    const electricButton = screen.getByRole('button', {
      name: /electric/i,
    });
    expect(electricButton).toBeInTheDocument();
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro.', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allButton).toBeInTheDocument();

    userEvent.click(allButton);
    const pokemon = screen.getByText(/pikachu/i);
    expect(pokemon).toBeInTheDocument();
  });
});
