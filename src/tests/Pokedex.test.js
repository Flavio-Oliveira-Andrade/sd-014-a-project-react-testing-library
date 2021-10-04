import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe('testa componente "Pokedex"', () => {
  const typesOfPokemon = pokemons.reduce((acc, curr) => {
    if (acc.includes(curr.type)) {
      return acc;
    }
    acc.push(curr.type);
    return acc;
  }, []);

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

    const nomePokemons = screen.queryAllByTestId('pokemon-name');
    expect(nomePokemons.length).toBe(1);
  });

  test('a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const arrayTipo = screen.queryAllByTestId(/pokemon-type-button/i);

    expect(typesOfPokemon.length).toBe(arrayTipo.length);

    typesOfPokemon.forEach((type) => {
      const botaoTipo = screen.getAllByRole('button', {
        name: type,
      });

      userEvent.click(botaoTipo[0]);

      expect(botaoTipo.type).toBe(typesOfPokemon.type);
    });
  });

  test('a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allTypesButton = screen.getByRole('button', { name: /All/i });

    userEvent.click(allTypesButton);
    expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
  });
});

// https://github.com/tryber/sd-014-a-project-react-testing-library/pull/113/commits/2972be334a1e4f009ee5247f29ab804729fc6afa
