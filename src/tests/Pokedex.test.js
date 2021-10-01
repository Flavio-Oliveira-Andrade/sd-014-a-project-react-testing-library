import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../utilities/renderWithRouter';

describe('Testando testando o componente Pokedex', () => {
  it('testa se tem um h2 com a frase "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const isH2 = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(isH2).toBeInTheDocument();
  });

  it('testa se o botão contem o texto "Próximo Pokemon"', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeInTheDocument();
    const pokemon = screen.getByTestId('pokemon-name');
    fireEvent.click(button);
    expect(pokemon.innerHTML).toBe('Charmander');
  });

  it('testa se é mostrado 1 pokemon por vez', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon).toHaveLength(1);
  });
  it('testa se a Pokedex tem filtros', () => {
    renderWithRouter(<App />);
    const buttonFilter = screen.getAllByTestId('pokemon-type-button');
    buttonFilter.forEach((button, index) => {
      expect(button).not.toEqual(buttonFilter[index + 1]);
    });
  });
  // logica do teste feita e compreendido com a ajuda do Murilo Maia
  it('testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByText('Pikachu');
    const button = screen.getByRole('button', { name: /All/i });
    fireEvent.click(button);
    expect(pikachu).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
