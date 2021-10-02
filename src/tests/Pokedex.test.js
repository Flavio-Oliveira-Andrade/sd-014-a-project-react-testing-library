import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa o componente Pokedex', () => {
  test('Testa se há o heading', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('Testa se o proximo pokemon aparece', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const pokeName = screen.getByTestId('pokemon-name');
    let pokemon = 'Pikachu';
    expect(pokeName.innerHTML).toStrictEqual(pokemon);
    expect(pokeName).toBeInTheDocument();

    const nextButton = screen.getByTestId('next-pokemon');
    expect(nextButton).toBeInTheDocument();
    userEvent.click(nextButton);
    pokemon = 'Charmander';
    expect(pokeName.innerHTML).toStrictEqual(pokemon);
    expect(pokeName).toBeInTheDocument();
  });

  test('Testa se há apenas um pokemon por vez', () => {
    // https://jestjs.io/pt-BR/docs/expect
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokeName = screen.getAllByTestId('pokemon-name');
    expect(pokeName).toHaveLength(1);
  });

  test('', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const allButton = screen.getByRole('button', {
      name: /All/i,
    });
    expect(allButton).toBeInTheDocument();

    const length = 7;
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(typeButtons).toHaveLength(length);

    userEvent.click(typeButtons[1]);
    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType.innerHTML).toStrictEqual(typeButtons[1].innerHTML);
    const nextButton = screen.getByTestId('next-pokemon');
    userEvent.click(nextButton);
    const pokeType2 = screen.getByTestId('pokemon-type');
    expect(pokeType.innerHTML).toStrictEqual(pokeType2.innerHTML);
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const allButton = screen.getByRole('button', {
      name: /All/i,
    });
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
  });
});
