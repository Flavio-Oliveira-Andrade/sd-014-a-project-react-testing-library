import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testa componente "Pokedex"', () => {
  test('página contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const heading = screen
      .getByRole('heading', { name: /Encountered pokémons/i, level: 2 });

    expect(heading).toBeInTheDocument();
  });

  test('é exibido o próximo Pokémon da lista quando "Próximo pokémon" é clicado', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });

    expect(nextButton).toBeInTheDocument();

    const firstPokémon = screen.getByText(/Pikachu/i);

    expect(firstPokémon).toBeInTheDocument();

    userEvent.click(nextButton);

    expect(screen.getByText(/Charmander/i)).toBeInTheDocument();
  });

  test('é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
  });

  test('a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
  });

  test('a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
  });
});
