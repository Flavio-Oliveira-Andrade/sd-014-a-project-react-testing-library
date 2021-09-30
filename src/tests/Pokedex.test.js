import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/Rotas';

import Home from '../App';

describe(' Testes Pokedex.', () => {
  it('Testando se página contém um h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<Home />);

    const tituloh2 = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(tituloh2).toBeInTheDocument();
  });

  it('Testando botão de ver Pokemons"', () => {
    renderWithRouter(<Home />);
    const btnVer = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(btnVer).toBeInTheDocument();

    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon.innerHTML).toBe('Pikachu');
    userEvent.click(btnVer);
    expect(namePokemon.innerHTML).toBe('Charmander');
    userEvent.click(btnVer);
    expect(namePokemon.innerHTML).toBe('Caterpie');
  });

  it('Ver se pokemos aparece um de cada vez', () => {
    renderWithRouter(<Home />);
    const btnVer = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(btnVer).toBeInTheDocument();

    const namePokemon = screen.getAllByTestId('pokemon-name');
    expect(namePokemon).toHaveLength(1);
    userEvent.click(btnVer);
    expect(namePokemon).toHaveLength(1);
  });

  it('Testando se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<Home />);
    const btnFilters = screen.getAllByTestId('pokemon-type-button');

    btnFilters.forEach((btn) => {
      expect(btn).toBeInTheDocument();
    });

    const btnProximo = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(btnProximo).toBeInTheDocument();

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
    userEvent.click(btnProximo);
    expect(typePokemon.innerHTML).toBe('Fire');
    expect(btnFire.innerHTML).toBe('Fire');
  });
  it('Testando se a Pokédex tem o botão de resetar o filtro', () => {
    renderWithRouter(<Home />);
    const btnAll = screen.getByRole('button', {
      name: 'All',
    });
    expect(btnAll).toBeInTheDocument();

    const btnProximo = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(btnProximo).toBeInTheDocument();

    userEvent.click(btnAll);
    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon.innerHTML).toBe('Electric');
    userEvent.click(btnProximo);
    expect(typePokemon.innerHTML).toBe('Fire');
  });
});
