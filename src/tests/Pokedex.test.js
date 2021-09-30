import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import pokemon from '../data';

describe('Testando o componente Pokedex', () => {
  it('Testando se página contém um h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const headingH2 = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(headingH2).toBeInTheDocument();
  });

  it(`Testando se é exibido o próximo 
  Pokémon da lista quando o botão "Próximo pokémon" é clicado`, () => {
    renderWithRouter(<App />);

    const btnPreview = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(btnPreview).toBeInTheDocument();

    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toHaveTextContent(pokemon[0].name);

    userEvent.click(btnPreview);
    expect(namePokemon).toHaveTextContent(pokemon[1].name);

    userEvent.click(btnPreview);
    expect(namePokemon).toHaveTextContent(pokemon[2].name);
  });

  it('Testando se é mostrado um pokemon por vez', () => {
    renderWithRouter(<App />);
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
    renderWithRouter(<App />);
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
      name: pokemon[0].type,
    });

    const btnFire = screen.getByRole('button', {
      name: pokemon[1].type,
    });

    userEvent.click(btnElectric);
    expect(typePokemon).toHaveTextContent(pokemon[0].type);

    userEvent.click(btnFire);
    expect(typePokemon).toHaveTextContent(pokemon[1].type);

    userEvent.click(btnPreview);
    expect(typePokemon).toHaveTextContent(pokemon[1].type);
    expect(btnFire).toHaveTextContent(pokemon[1].type);
  });

  it('Testando se a Pokédex tem o botão de resetar o filtro', () => {
    renderWithRouter(<App />);
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
    expect(typePokemon).toHaveTextContent(pokemon[0].type);

    userEvent.click(btnPreview);
    expect(typePokemon).toHaveTextContent(pokemon[1].type);
  });
});
