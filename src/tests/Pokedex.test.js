import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('5º verifica funcionamento do componente Pokedex', () => {
  it('verifica se a pagina contem h2 com texto "ncountered pokémons" ', () => {
    renderWithRouter(<App />);
    const headingElement = screen.getByRole('heading', { level: 2 });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent(/^encountered pokémons$/i);
  });
  it('verifica se é exibido o proximo pokemon da lista, quando clicado no botão.', () => {
    renderWithRouter(<App />);
    const buttonElement = screen.getByTestId('next-pokemon');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(/^próximo pokémon$/i);

    pokemons.forEach((_pokemon, index) => {
      userEvent.click(buttonElement);
      const elementAtual = screen.getByTestId('pokemon-name');
      if (pokemons.length - 1 === index) {
        expect(elementAtual).toHaveTextContent(pokemons[0].name);
      } else {
        expect(elementAtual).toHaveTextContent(pokemons[index + 1].name);
      }
    });
  });
  it('verifica se é exibido apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const nameElements = screen.getAllByTestId('pokemon-name');
    expect(nameElements[0]).toBeInTheDocument();
    expect(nameElements).toHaveLength(1);
  });
});
