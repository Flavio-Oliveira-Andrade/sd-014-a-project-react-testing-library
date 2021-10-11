import React from 'react';
import { screen } from '@testing-library/react';
import fireEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente Pokedex', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const encountred = screen.getByRole('heading',
      { level: 2, name: /Encountered pokémons/i });
    expect(encountred).toBeInTheDocument();
  });
  test('O botão deve conter o texto Próximo pokémon', () => {
    renderWithRouter(<App />);
    const text = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(text).toBeInTheDocument();
  });
  // src: https://github.com/tryber/sd-014-a-project-react-testing-library/pull/83/files
  test('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado.', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent('Pikachu');
    fireEvent.click(button);
    expect(pokemon).toHaveTextContent('Charmander');
    fireEvent.click(button);
    expect(pokemon).toHaveTextContent('Caterpie');
    fireEvent.click(button);
    expect(pokemon).toHaveTextContent('Ekans');
    fireEvent.click(button);
  });
  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });
  // src: https://github.com/tryber/sd-014-a-project-react-testing-library/pull/83/files
  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const pokemonTypes = 7;
    const pokemonButton = screen.getAllByTestId('pokemon-type-button');
    expect(pokemonButton[0].innerHTML).toBe('Electric');
    expect(pokemonButton[1].innerHTML).toBe('Fire');
    expect(pokemonButton[2].innerHTML).toBe('Bug');
    expect(pokemonButton[3].innerHTML).toBe('Poison');
    expect(pokemonButton[4].innerHTML).toBe('Psychic');
    expect(pokemonButton[5].innerHTML).toBe('Normal');
    expect(pokemonButton[6].innerHTML).toBe('Dragon');
    expect(pokemonButton.length).toBe(pokemonTypes);
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const resetButton = screen.getByRole('button', { name: /All/i });
    const pokemon = screen.getByText(/average weight: 6\.0 kg/i);
    expect(resetButton).toBeInTheDocument();
    expect(resetButton).toBeVisible();
    fireEvent.click(resetButton);
    expect(pokemon).toBeInTheDocument();
  });
});
