import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('5 - Testes do componente Pokedex.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Deve haver uma tag h2 com texto "Encountered pokémons"', () => {
    const encounteredHeader = screen.getByText('Encountered pokémons');

    expect(encounteredHeader).toBeInTheDocument();
  });
  it('Testa se o botão "Próximo pokémon" contém este texto', () => {
    const nextPokemonBtn = screen.getByTestId('next-pokemon');
    expect(nextPokemonBtn).toHaveTextContent('Próximo pokémon');
  });
  it('Testa se o próximo pokémon é mostrado ao clicar no botão', () => {
    const nextPokemonButton = screen.getByTestId('next-pokemon');
    userEvent.click(nextPokemonButton);

    const pokemonName = screen.getByText('Charmander');
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Fire');
  });
  it('Testa os botões de filtro', () => {
    const allFilterButtons = screen.getAllByTestId('pokemon-type-button');
    const bugFilterButtons = allFilterButtons[2];
    userEvent.click(bugFilterButtons);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonTypeInfo = screen.getByTestId('pokemon-type');
    expect(pokemonName).toHaveTextContent('Caterpie');
    expect(pokemonTypeInfo).toHaveTextContent('Bug');
  });
  it('Testa se clicar no botão All mostra mais de um tipo de pokémon', () => {
    const allTypesButton = screen.getByText('All');

    userEvent.click(allTypesButton);
    const pokemonSection = screen.getAllByText(/Average weight/i);
    expect(pokemonSection).toHaveLength(1);
  });
  it('Testa se os botões de filtro são únicos com o tipo de cada pokémon', () => {
    const filteringButtons = screen.getAllByTestId('pokemon-type-button');
    const pokemonTypes = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    for (let index = 0; index < pokemonTypes.length; index += 1) {
      expect(filteringButtons[index]).toHaveTextContent(pokemonTypes[index]);
    }
  });
});
