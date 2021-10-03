import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter/renderWithRouter';
import App from '../App';

describe('testa o componente Pokedex', () => {
  it('testa heading com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const PokemonEncountered = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });

    expect(PokemonEncountered).toBeInTheDocument();
  });

  it('testa se é exibido o próximo Pokémon da lista', () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });

    expect(nextPokemon).toBeInTheDocument();
  });

  it('testa se é exibido um pokemon por vez', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getAllByTestId('pokemon-name');

    expect(pokemon).toHaveLength(1);
  });

  it('testa se a pokedex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const filters = screen.getAllByTestId('pokemon-type-button');
    filters.forEach((button, index) => {
      expect(button).not.toEqual(filters[index + 1]);
    });
  });

  it('testa se a pokedex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getByText('Pikachu');
    const button = screen.getByRole('button', { name: /all/i });
    userEvent.click(button);

    expect(pokemon).toBeInTheDocument();
  });
});
