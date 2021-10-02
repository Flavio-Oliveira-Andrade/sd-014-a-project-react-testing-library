import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const pokeNameTestId = 'pokemon-name';

function renderWithRouter(component) {
  const customHistory = createMemoryHistory();
  return {
    ...render(
      <Router history={ customHistory }>
        {component}
      </Router>,
    ),
    history: customHistory,
  };
}

describe('5 Requisito', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/');

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });

    expect(h2).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista'
  + 'quando o botão Próximo pokémon é clicado.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/');

    const nextPokemonBtn = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    const pokemonName = screen.getByTestId(pokeNameTestId);
    expect(nextPokemonBtn.innerHTML).toBe('Próximo pokémon');
    userEvent.click(nextPokemonBtn);
    expect(pokemonName.innerHTML).toBe('Charmander');

    const pokemonNumber = 8;
    for (let i = 0; i < pokemonNumber; i += 1) {
      userEvent.click(nextPokemonBtn);
    }

    expect(pokemonName.innerHTML).toBe('Pikachu');
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/');

    const pokemonBtn = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });

    userEvent.click(pokemonBtn);

    const pokemonName = screen.queryAllByTestId(pokeNameTestId);

    expect(pokemonName).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/');

    const pokemonTypeBtn = screen.queryAllByTestId('pokemon-type-button');
    const pokemonType = screen.queryAllByTestId('pokemon-type');
    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });

    pokemonType.forEach((type, i) => {
      userEvent.click(pokemonTypeBtn[i]);
      expect(type.innerHTML).toBe(pokemonTypeBtn[i].innerHTML);
      expect(allBtn).toBeInTheDocument();
    });
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/');

    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });

    expect(allBtn).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/');

    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });

    expect(allBtn).toBeTruthy();

    userEvent.click(allBtn);

    const pokemonName = screen.queryAllByTestId(pokeNameTestId);

    expect(pokemonName[0].innerHTML).toBe('Pikachu');
  });
});
