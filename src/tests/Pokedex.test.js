import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  beforeEach(() => renderWithRouter(<App />));
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const h2 = screen.getByRole('heading', {
      name: /Encountered pokémons/,
      level: 2,
    });
    expect(h2).toBeInTheDocument();
  });
  test('Teste se é exibido o próximo Pokémon da lista quando'
    + 'o botão Próximo pokémon é clicado', () => {
    const btnNextPkm = screen.getByRole('button', {
      name: /Próximo pokémon/,
    });
    expect(btnNextPkm).toBeInTheDocument();

    const pokemon = screen.getAllByTestId('pokemon-name');

    userEvent.click(btnNextPkm);
    expect(pokemon).toHaveTextContent('Charmander');
    userEvent.click(btnNextPkm);
    expect(pokemon).toHaveTextContent('Caterpie');
    userEvent.click(btnNextPkm);
    expect(pokemon).toHaveTextContent('Ekans');
  });
  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const pkmName = screen.getAllByTestId('pokemon-name');
    expect(pkmName.length).toBe(1);
  });
  test('Teste se a Pokédex tem os botões de filtro.', () => {
    const btnFilter = screen.getAllByTestId('pokemon-type-button');
    btnFilter.forEach((btn) => {
      expect(btn).toBeInTheDocument();
      const btnAll = screen.getByRole('button', {
        name: 'All',
      });
      const btnPikachu = screen.getByRole('button', {
        name: 'Electric',
      });
      const btnBug = screen.getByRole('button', {
        name: 'Bug',
      });
      expect(btnAll).toBeInTheDocument();
      userEvent.click(btnPikachu);
      expect(btnPikachu.innerHTML).toBe('Electric');
      userEvent.click(btnBug);
      expect(btnBug.innerHTML).toBe('Bug');
    });
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const btnAll = screen.getByRole('button', {
      name: 'All',
    });
    expect(btnAll).toBeInTheDocument();

    const pkmnShow = screen.getByTestId('pokemon-name');
    expect(pkmnShow).toHaveTextContent('Pikachu');
    const btnNext = screen.getByTestId('next-pokemon');
    userEvent.click(btnNext);
    expect(pkmnShow).toHaveTextContent('Charmander');
    userEvent.click(btnAll);
    expect(pkmnShow).toHaveTextContent('Pikachu');
  });
});
