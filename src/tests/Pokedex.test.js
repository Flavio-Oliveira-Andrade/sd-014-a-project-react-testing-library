import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Pokedex.js test', () => {
  it('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const textEncountPoke = screen.getByText('Encountered pokémons');
    expect(textEncountPoke).toBeInTheDocument();
  });
  it('Testa se é exibido o próximo Pokémon da lista'
  + ' quando o botão Próximo pokémon é clicado.', () => {
    renderWithRouter(<App />);
    const button = screen.getByTestId('next-pokemon');
    const pokeName = screen.getByTestId('pokemon-name');

    expect(button.innerHTML).toBe('Próximo pokémon');
    userEvent.click(button);
    expect(pokeName.innerHTML).toBe('Charmander');
  });
  it('Testa se é mostrado apenas um Pokémon por vez.', async () => {
    renderWithRouter(<App />);
    const pokeName = screen.getAllByTestId('pokemon-name');
    expect(pokeName.length).toBe(1);
  });
  it('Testa se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const verificabutton = filterButtons.length > 0;
    expect(verificabutton).toBe(true);
  });
  it('', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    const buttonBug = screen.getByRole('button', { name: 'Bug' });
    const pokeType = screen.getByTestId('pokemon-type');

    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonBug);
    expect(pokeType.innerHTML).toBe('Bug');
    userEvent.click(buttonAll);
    expect(pokeType.innerHTML).toBe('Electric');
  });
});
