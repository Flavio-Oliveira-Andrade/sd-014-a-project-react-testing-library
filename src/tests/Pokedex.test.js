import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './render/renderWithRouter';

import App from '../App';

const SEVEN = 7;

describe('Testes do requisito 5', () => {
  it('se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    expect(
      screen.getByRole('heading', { level: 2, name: /encountered pokémons/i }),
    ).toBeInTheDocument();
  });

  it('se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(button).toBeInTheDocument();
    const pokemon = screen.getByTestId('pokemon-name');
    fireEvent.click(button);
    expect(pokemon.innerHTML).toBe('Charmander');
  });

  it('se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    expect(screen.getAllByTestId('pokemon-name')).toHaveLength(1);
  });

  it('se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const filters = screen.getAllByTestId('pokemon-type-button');
    expect(filters).toHaveLength(SEVEN);
    filters.forEach((filter, index) => {
      expect(filter).not.toEqual(filters[index + 1]);
    });
  });

  it('se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /all/i });
    fireEvent.click(button);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
