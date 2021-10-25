import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  beforeEach(() => renderWithRouter(<App />));
  test('se página contém um heading h2 com o texto Encountered pokémons', () => {
    const heading = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });

  test('se é exibido o próx Poke da lista quando o botão Próx poke é clicado', () => {
    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(nextButton);
    const secondPokemon = screen.getByText('Charmander');
    expect(secondPokemon).toBeInTheDocument();
    userEvent.click(nextButton);
    const thirdPokemon = screen.getByText('Caterpie');
    expect(thirdPokemon).toBeInTheDocument();
  });

  test('se é mostrado apenas um Pokémon por vez.', () => {
    const pokemons = screen.getAllByTestId('pokemon-name');
    expect(pokemons.length).toBe(1);
  });

  test('se a Pokédex tem os botões de filtro', () => {
    const filters = screen.getAllByTestId('pokemon-type-button');
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    expect(filters.length).toBe(types.length);
    filters.forEach((button, index) => (
      expect(button).toHaveTextContent(types[index])
    ));
  });
});
