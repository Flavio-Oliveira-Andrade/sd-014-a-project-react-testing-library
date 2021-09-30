import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './services/renderWithRouter';
import pokemons from '../data';

const types = pokemons.map((pokemon) => pokemon.type)
  .reduce((acc, type) => {
    if (acc.includes(type)) return acc;
    return [...acc, type];
  }, []);

const DATA_TEST_NAME = 'pokemon-name';

describe('tests Pokedex.js component', () => {
  beforeEach(() => renderWithRouter(<App />));
  it('renders the "Encountered pokémons" heading text', () => {
    const headingText = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(headingText).toBeInTheDocument();
  });

  it('renders the next button named "Próximo Pokémon"'
  + 'on next button click, renders only the next pokémon', () => {
    const nextBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(nextBtn).toBeInTheDocument();

    const currentPkm = screen.getAllByTestId(DATA_TEST_NAME);
    expect(currentPkm).toHaveLength(1);
    userEvent.click(nextBtn);
    const nextPkm = screen.getAllByTestId(DATA_TEST_NAME);
    expect(currentPkm).not.toBe(nextPkm);
    expect(nextPkm).toHaveLength(1);
  });

  it('renders one button per pokémon type with the respective type as text', () => {
    const typeBtns = screen.getAllByTestId('pokemon-type-button');
    types.forEach((type, index) => {
      const typeBtn = typeBtns[index];
      expect(typeBtn).toBeInTheDocument();
      expect(typeBtn).toHaveTextContent(type);
    });
  });

  it('on click, must select only those pokémon of the type selected', () => {
    types.forEach((type) => {
      const typeBtn = screen.getByRole('button', {
        name: type,
      });
      userEvent.click(typeBtn);
      const selectedType = screen.getByTestId('pokemon-type');
      expect(selectedType).toHaveTextContent(type);
    });
  });

  it('renders an "All" button that resets to default list', () => {
    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allBtn).toBeInTheDocument();
    userEvent.click(allBtn);
    const firstPkm = screen.getByTestId(DATA_TEST_NAME);
    expect(firstPkm).toHaveTextContent(/pikachu/i);
  });
});
