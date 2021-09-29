import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './util/renderWithRouter';

const pokemonName = 'pokemon-name';
const pokemonType = 'pokemon-type';
describe('Teste do componente <Pokedex.js />', () => {
  it('Verifica se página contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const encounteredText = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(encounteredText).toBeInTheDocument();
  });
  it('Verifica se é exibido o próximo Pokémon da lista quando o'
  + ' botão "Próximo pokémon" é clicado', () => {
    renderWithRouter(<App />);
    const prevPokemonName = screen.getByTestId(pokemonName);
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextButton);
    const nextPokemonName = screen.getAllByTestId(pokemonName);
    expect(prevPokemonName).not.toEqual(nextPokemonName);
  });
  it('Verifica se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemonRendered = screen.getAllByTestId(pokemonName);
    expect(pokemonRendered).toHaveLength(1);
  });

  it('Verifica se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const filterButton = screen.getAllByTestId('pokemon-type-button');
    userEvent.click(filterButton[0]);
    const filter = screen.getByTestId(pokemonType);
    expect(filter.innerHTML).toBe(filterButton[0].innerHTML);
  });
  it('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const resetButton = screen.getByRole('button', { name: /all/i });
    userEvent.click(resetButton);
    const prevType = screen.getByTestId(pokemonType).innerHTML;
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextButton);
    const newType = screen.getByTestId(pokemonType).innerHTML;
    expect(newType).not.toEqual(prevType);
  });
});
