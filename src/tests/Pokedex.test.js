import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import Home from '../App';

describe('Testando o componente Pokedex', () => {
  it('Testando se página contém um h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<Home />);
    const headingH2 = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(headingH2).toBeInTheDocument();
  });

  it(`Testando se é exibido o próximo 
  Pokémon da lista quando o botão "Próximo pokémon" é clicado`, () => {
    renderWithRouter(<Home />);

    const btnPreview = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(btnPreview).toBeInTheDocument();

    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon.innerHTML).toBe('Pikachu');
    userEvent.click(btnPreview);
    expect(namePokemon.innerHTML).toBe('Charmander');
    userEvent.click(btnPreview);
    expect(namePokemon.innerHTML).toBe('Caterpie');
  });
  it('Testando se é mostrado um pokemon por vez', () => {
    renderWithRouter(<Home />);
    const btnPreview = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(btnPreview).toBeInTheDocument();

    const namePokemon = screen.getAllByTestId('pokemon-name');
    expect(namePokemon).toHaveLength(1);
    userEvent.click(btnPreview);
    expect(namePokemon).toHaveLength(1);
  });

  it('Testando se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<Home />);
    const btnFilters = screen.getAllByTestId('pokemon-type-button');

    btnFilters.forEach((btn) => {
      expect(btn).toBeInTheDocument();
    });

    const btnPreview = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(btnPreview).toBeInTheDocument();

    const typePokemon = screen.getByTestId('pokemon-type');
    const btnElectric = screen.getByRole('button', {
      name: 'Electric',
    });
    const btnFire = screen.getByRole('button', {
      name: 'Fire',
    });
    userEvent.click(btnElectric);
    expect(typePokemon.innerHTML).toBe('Electric');
    userEvent.click(btnFire);
    expect(typePokemon.innerHTML).toBe('Fire');
    userEvent.click(btnPreview);
    expect(typePokemon.innerHTML).toBe('Fire');
    expect(btnFire.innerHTML).toBe('Fire');
  });

  it('Testando se a Pokédex tem o botão de resetar o filtro', () => {
    renderWithRouter(<Home />);
    const btnAll = screen.getByRole('button', {
      name: 'All',
    });
    expect(btnAll).toBeInTheDocument();

    const btnPreview = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(btnPreview).toBeInTheDocument();

    userEvent.click(btnAll);
    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon.innerHTML).toBe('Electric');
    userEvent.click(btnPreview);
    expect(typePokemon.innerHTML).toBe('Fire');
  });
});
