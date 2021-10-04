import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testa o componente Pokedex.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it('Deveria ter um h2 com o texto "Encountered pokémons"', () => {
    const h2 = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(h2).toBeInTheDocument();
  });
  it('Deveria ter um botão para o próximo pokémon funcionando corretamente', () => {
    const nextButton = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(nextButton).toBeInTheDocument();
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    expect(screen.getByText('Caterpie')).toBeInTheDocument();
  });
  it('Deveria existir um botão para resetar o filtro', () => {
    const button = screen.getByRole('button', {
      name: /All/i,
    });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
  it('Deveria aparecer apenas um pokémon por vez', () => {
    expect(screen.getAllByText('More details')).toHaveLength(1);
  });
  it('Deveria existir botões de filtragem dos pokémons pelos tipos', () => {
    const pokemonsTypeButton = screen.getAllByTestId('pokemon-type-button');
    pokemonsTypeButton.forEach((element, index) => {
      expect(element).not.toEqual(pokemonsTypeButton[index + 1]);
    });
  });
});
