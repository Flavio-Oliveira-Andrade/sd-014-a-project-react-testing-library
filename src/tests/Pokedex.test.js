import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Utilis/renderWithRouter';
import App from '../App';

describe('Teste o componente "Pokedex"', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);

    const h2TextPokedex = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });

    expect(h2TextPokedex).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista'
    + 'quando o botão Próximo pokémon é clicado.', () => {
    renderWithRouter(<App />);

    const buttonNextPkm = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(buttonNextPkm).toBeInTheDocument();

    const pkmName = screen.getByTestId('pokemon-name');

    userEvent.click(buttonNextPkm);
    expect(pkmName).toHaveTextContent('Charmander');

    userEvent.click(buttonNextPkm);
    expect(pkmName).toHaveTextContent('Caterpie');

    userEvent.click(buttonNextPkm);
    expect(pkmName).toHaveTextContent('Ekans');
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    const pkmName = screen.getAllByTestId('pokemon-name');
    expect(pkmName.length).toBe(1);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    const buttonFilter = screen.getAllByTestId('pokemon-type-button');

    buttonFilter.forEach((button) => {
      expect(button).toBeInTheDocument(); // botão de filto para cada.

      const buttonAll = screen.getByRole('button', { name: 'All' });
      const buttonPikachu = screen.getByRole('button', { name: 'Electric' });
      const buttonBug = screen.getByRole('button', { name: 'Bug' });

      expect(buttonAll).toBeInTheDocument();
      userEvent.click(buttonPikachu);
      expect(buttonPikachu.innerHTML).toBe('Electric');
      userEvent.click(buttonBug);
      expect(buttonBug.innerHTML).toBe('Bug');
    });
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: 'All' });
    const buttonType = screen.getByTestId('pokemon-type');

    userEvent.click(buttonAll);
    expect(buttonType.innerHTML).toBe('Electric');
  });
});
