import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Pokedex.js Testes', () => {
  it('Teste se pg tem um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    expect((screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/,
    }))).toBeInTheDocument();
  });
  it('Teste se é exibido o próx Pokémon qnd o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getByTestId('pokemon-name');
    const button = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(button);
    expect(pokemon.innerHTML).toBe('Charmander');
  });
  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId('pokemon-weight');
    expect(pokemon).toHaveLength(1);
  });
  /* https://jestjs.io/pt-BR/docs/expect */
  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const filterbutton = screen.getAllByTestId('pokemon-type-button');
    filterbutton.forEach((element, index) => {
      expect(element).not.toEqual(filterbutton[index + 1]);
    });
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', {
      name: 'All',
    });
    const pokemonType = screen.getByTestId('pokemon-name');
    userEvent.click(buttonAll);
    expect(pokemonType.innerHTML).toBe('Pikachu');
  });
});
