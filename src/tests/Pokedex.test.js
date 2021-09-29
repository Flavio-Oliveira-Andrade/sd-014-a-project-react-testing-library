import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Testa o componente Pokedex', () => {
  const pokemonTestId = 'pokemon-name';
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const text = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/,
    });
    expect(text).toBeInTheDocument();
  });

  test('se é exibido o próximo Pokémon da lista quando o botão Próximo é clicado', () => {
    renderWithRouter(<App />);
    const button = screen.getByTestId('next-pokemon');
    const pokemon = screen.getByTestId(pokemonTestId);
    expect(button.innerHTML).toBe('Próximo pokémon');
    userEvent.click(button);
    expect(pokemon.innerHTML).toBe('Charmander');
  });
  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId(pokemonTestId);
    expect(pokemon).toHaveLength(1);
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    typeButtons.forEach((element, index) => {
      expect(element).not.toEqual(typeButtons[index + 1]);
    });
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: 'All' });
    const pokemonName = screen.getByTestId(pokemonTestId);
    userEvent.click(allButton);
    expect(pokemonName.innerHTML).toBe('Pikachu');
  });
});
