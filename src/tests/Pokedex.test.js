import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Pokedex.js test', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const h2Text = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(h2Text).toBeInTheDocument();
  });
  test('Teste se é exibido o próximo pkmn da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);
    const nextPkmnButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextPkmnButton).toBeInTheDocument();

    pokemons.forEach(({ name }) => {
      const nextPkmn = screen.getByTestId('pokemon-name');
      expect(nextPkmn).toBeInTheDocument();
      expect(nextPkmn).toHaveTextContent(name);
      fireEvent.click(nextPkmnButton);
    });
  });
  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pkmnDisplay = screen.getAllByTestId('pokemon-name');
    expect(pkmnDisplay.length).toBe(1);
  });
  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
  });
});
