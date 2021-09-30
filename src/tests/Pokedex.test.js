import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './services/renderWithRouter';
import pokemons from '../data';

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

    const currentPkm = screen.getAllByTestId('pokemon-name');
    expect(currentPkm).toHaveLength(1);
    userEvent.click(nextBtn);
    const nextPkm = screen.getAllByTestId('pokemon-name');
    expect(currentPkm).not.toBe(nextPkm);
    expect(nextPkm).toHaveLength(1);
  });

  it('renders one button per pokémon type'
  + 'on click, must select only those pokémon of the type selected', () => {
    const typeBtns = screen.getAllByTestId('pokemon-type-button');
    pokemons.map((pokemon) => pokemon.type)
      .reduce((acc, type) => {
        if (acc.includes(type)) return acc;
        return [...acc, type];
      }, [])
      .forEach((type, index) => {
        const typeBtn = typeBtns[index];
        expect(typeBtn).toBeInTheDocument();
        expect(typeBtn).toHaveTextContent(type);
      });
  });
});
