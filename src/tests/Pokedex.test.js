import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Pokedex.js test', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const h2Text = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(h2Text).toBeInTheDocument();
  });
  test('Teste se é exibido o próximo pkmn da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);
    const nextPkmnButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextPkmnButton).toBeInTheDocument();

    pokemons.forEach(({ name }) => {
      const nextPkmn = screen.getByTestId('pokemon-name');
      expect(nextPkmn).toBeInTheDocument();
      expect(nextPkmn).toHaveTextContent(name);
      fireEvent.click(nextPkmnButton);
    });
  });
  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pkmnDisplay = screen.getAllByTestId('pokemon-name');
    expect(pkmnDisplay.length).toBe(1);
  });
  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const buttonsLength = 7;
    expect(filterButtons[0].innerHTML).toBe('Electric');
    expect(filterButtons[1].innerHTML).toBe('Fire');
    expect(filterButtons[2].innerHTML).toBe('Bug');
    expect(filterButtons[3].innerHTML).toBe('Poison');
    expect(filterButtons[4].innerHTML).toBe('Psychic');
    expect(filterButtons[5].innerHTML).toBe('Normal');
    expect(filterButtons[6].innerHTML).toBe('Dragon');
    expect(filterButtons.length).toBe(buttonsLength);
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();
    fireEvent.click(buttonAll);
    const initialPkmn = screen.getByTestId('pokemon-name');
    expect(initialPkmn).toHaveTextContent('Pikachu');
  });
});
