import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('5. Teste o componente <Pokedex.js />', () => {
  const typesPKMN = pokemons.reduce((acc, cur) => {
    if (acc.includes(cur.type)) return acc;
    acc.push(cur.type);
    return acc;
  }, []);

  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const header = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(header).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista'
  + ' quando o botão Próximo pokémon é clicado.', () => {
    renderWithRouter(<App />);
    const nextBTN = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    userEvent.click(nextBTN);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    userEvent.click(nextBTN);
    expect(screen.getByText('Caterpie')).toBeInTheDocument();
    for (let index = 0; index < pokemons.length - 2; index += 1) {
      userEvent.click(nextBTN);
    } // This tests if after doing a whole loop in the array of pokemons object, we are back to the first element of the array

    const currentPKMN = screen.getByText(pokemons[0].name);
    expect(currentPKMN).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    expect(screen.queryAllByTestId('pokemon-name').length).toBe(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const arrayOfTypeBTN = screen.queryAllByTestId('pokemon-type-button');
    expect(arrayOfTypeBTN.length).toBe(typesPKMN.length);
    typesPKMN.forEach((type) => {
      const singleType = screen.getAllByRole('button', {
        name: type,
      });
      const nextBTN = screen.getByRole('button', {
        name: /Próximo pokémon/i,
      });
      expect(singleType.length).toBe(1);
      userEvent.click(singleType[0]);
      expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
      userEvent.click(nextBTN);
      expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allBTN = screen.getByRole('button', {
      name: 'All',
    });
    userEvent.click(allBTN);
    expect(screen.getByText(pokemons[0].name)).toBeInTheDocument();
  });
});
