import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe(' Requisito 5, testa todo o componente Pokedex', () => {
  beforeEach(() => renderWithRouter(<App />));
  test('Se a página contém um heading H2 com o texto \'Encountered pokémons\'', () => {
    const headingMsg = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(headingMsg).toBeInTheDocument();
  });

  test('Se é exibido o próximo Pokémon da lista', () => {
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(nextButton);
    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();
    userEvent.click(nextButton);
    const caterpie = screen.getByText('Caterpie');
    expect(caterpie).toBeInTheDocument();
  });

  test('Se é mostrado apenas um Pokémon por vez', () => {
    const pokemonList = screen.getAllByTestId('pokemon-name');
    expect(pokemonList.length).toBe(1);
  });

  test('Se a Pokédex tem os botões de filtro', () => {
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    expect(filterButtons.length).toBe(types.length);
    filterButtons.forEach((button, index) => (
      expect(button).toHaveTextContent(types[index])
    ));
  });

  test('Se a Pokédex possui um botão para resetar o filtro', () => {
    const resetFilterBtn = screen.getByRole('button', { name: 'All' });
    expect(resetFilterBtn).toBeInTheDocument();
    expect(resetFilterBtn).toHaveTextContent('All');
    userEvent.click(resetFilterBtn);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});
