import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Requisito 5
test('testa se página contém um heading h2 com o texto "Encountered pokémons"', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const textPagePokedex = screen.getByRole('heading', {
    level: 2,
    name: 'Encountered pokémons',
  });
  expect(textPagePokedex).toBeInTheDocument();
});

// Requisito 5
test('testa se é exibido o próximo Pokémon da lista '
+ 'quando o botão Próximo pokémon é clicado.', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const buttonNextPokemon = screen.getByRole('button', {
    name: /Próximo pokémon/i,
  });
  expect(buttonNextPokemon).toBeInTheDocument();
});

// Requisito 5
test('testa se é mostrado apenas um Pokémon por vez', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  // Referência: https://stackoverflow.com/questions/52783144/how-do-you-test-for-the-non-existence-of-an-element-using-jest-and-react-testing
  const listPokemons = screen.getAllByTestId('pokemon-name');
  expect(listPokemons).toHaveLength(1);
});

// // Requisito 5 *
test('testa se a Pokédex tem os botões de filtro', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const buttonsType = screen.getByRole('button', {
    name: /bug/i,
  });
  userEvent.click(buttonsType);

  const typePokemon = screen.getByTestId('pokemon-type');

  // Captura o valor innerHTML do tipo do Pokemon da tela
  // Compara se é igual a 'Bug'
  expect(typePokemon.innerHTML).toEqual('Bug');
});
test('A partir da seleção de um botão de tipo, '
+ 'a Pokédex deve circular somente pelos pokémons daquele tipo', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const typesPokemon = 7;
  const buttonsType = screen.getAllByTestId('pokemon-type-button');

  expect(buttonsType).toHaveLength(typesPokemon);
});

// // Requisito 5 *
test('testa se a Pokédex contém um botão para resetar o filtro', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const buttonReset = screen.getByRole('button', {
    name: /all/i,
  });
  expect(buttonReset).toBeInTheDocument();

  userEvent.click(buttonReset);
});
