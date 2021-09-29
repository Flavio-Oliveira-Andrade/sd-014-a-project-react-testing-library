import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

describe('Testa se o componente Pokedex: ', () => {
  it('renderiza um h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });

  it('exibe o próximo pokemon da lista ao se clicar no botão "Próximo pokemon"', () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextPokemon).toBeInTheDocument();

    userEvent.click(nextPokemon);
    const pokemon = screen.getAllByRole('link', { name: 'More details' });
    expect(pokemon).toHaveLength(1);

    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);

    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });

  it('possui os botões de filtro e eles funcionam: ', () => {
    renderWithRouter(<App />);
    const numberOfTypes = 7;

    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(typeButtons[0].innerHTML).toBe('Electric');
    expect(typeButtons[1].innerHTML).toBe('Fire');
    expect(typeButtons[2].innerHTML).toBe('Bug');
    expect(typeButtons[3].innerHTML).toBe('Poison');
    expect(typeButtons[4].innerHTML).toBe('Psychic');
    expect(typeButtons[5].innerHTML).toBe('Normal');
    expect(typeButtons[6].innerHTML).toBe('Dragon');

    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(typeButtons).toHaveLength(numberOfTypes);

    userEvent.click(typeButtons[1]);
    userEvent.click(nextButton);
    userEvent.click(nextButton);

    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
  });

  it('tem um botão para resetar os filtros', () => {
    renderWithRouter(<App />);

    const resetFilter = screen.getByRole('button', { name: /all/i });
    expect(resetFilter).toBeInTheDocument();

    userEvent.click(resetFilter);

    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });

    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);

    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});
