import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const idName = 'pokemon-name';

describe('Testa o componente Pokedex', () => {
  it('Teste se página contém um heading h2 com o'
        + ' texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const head2 = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(head2).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista'
        + ' quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    const btnNext = screen.getByTestId('next-pokemon');
    const testId = screen.getByTestId(idName);
    fireEvent.click(btnNext);
    expect(testId).toHaveTextContent('Charmander');
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const screenPokemons = screen.getAllByTestId(idName);
    expect(screenPokemons).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    types.forEach((typePoke) => expect(screen.getByRole('button', {
      name: typePoke,
    })).toBeInTheDocument());

    const btnType = screen.getAllByTestId('pokemon-type-button');
    const length = 7;
    expect(btnType).toHaveLength(length);

    fireEvent.click(btnType[2]);
    const testIdName = screen.getByTestId(idName);
    expect(testIdName).toHaveTextContent('Caterpie');

    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toBeVisible();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();

    const btnNext = screen.getByTestId('next-pokemon');
    expect(btnNext).toBeVisible();

    fireEvent.click(btnAll);
    const testIdName = screen.getByTestId(idName);
    expect(testIdName).toHaveTextContent('Pikachu');

    fireEvent.click(btnNext);
    expect(testIdName).toHaveTextContent('Charmander');
  });
});
