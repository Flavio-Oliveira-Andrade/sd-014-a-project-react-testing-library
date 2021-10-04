import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes do requisito 4', () => {
  it('Testa se página contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const headingPokedex = screen.getByRole('heading',
      { level: 2,
        name: /Encountered pokémons/i,
      });
    expect(headingPokedex).toBeInTheDocument();
  });

  it('Teste se exibi o próximo Pokémon quando o botão Próximo pokémon é clicado.', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(button).toBeInTheDocument();

    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon.innerHTML).toBe('Pikachu');
    userEvent.click(button);
    expect(pokemon.innerHTML).toBe('Charmander');
    userEvent.click(button);
    expect(pokemon.innerHTML).toBe('Caterpie');
  });

  it('Testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon).toHaveLength(1);
  });

  it('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const filters = screen.getAllByTestId('pokemon-type-button');
    filters.forEach((buttonFilters) => {
      expect(buttonFilters).toBeInTheDocument();
    });
    const button = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(button).toBeInTheDocument();
    const typePokemon = screen.getByTestId('pokemon-type');
    const buttonEletric = screen.getByRole('button', { name: 'Electric' });
    const buttonFire = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(buttonEletric);
    expect(typePokemon.innerHTML).toBe('Electric');
    userEvent.click(buttonFire);
    expect(typePokemon.innerHTML).toBe('Fire');
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon.innerHTML).toBe('Electric');
  });
});
