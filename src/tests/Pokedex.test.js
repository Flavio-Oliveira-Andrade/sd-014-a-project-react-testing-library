import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <Pokedex />', () => {
  test('Testa se a página contém um heading h2 com o texto "Encountered pokémons"',
    () => {
      renderWithRouter(<App />);

      const h2Text = screen.getByRole('heading', {
        level: 2,
        name: 'Encountered pokémons',
      });

      expect(h2Text).toBeInTheDocument();
    });

  test('Testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemonImage = screen.getAllByRole('img');

    expect(pokemonImage.length).toBe(1);
  });
});

describe('Testa se é exibido o próximo Pokémon da lista quando o botão '
+ '"Próximo pokémon" é clicado', () => {
  const NEXT_POKEMON = 'Próximo pokémon';

  test('O botão deve conter o texto "Próximo pokémon"', () => {
    renderWithRouter(<App />);

    const buttonNext = screen.getByRole('button', {
      name: NEXT_POKEMON,
    });

    expect(buttonNext).toBeInTheDocument();
  });

  test('Os próximos Pokémons da lista devem ser mostrados, um a um, '
  + 'ao clicar sucessivamente no botão', () => {
    renderWithRouter(<App />);

    const buttonNext = screen.getByRole('button', {
      name: NEXT_POKEMON,
    });

    fireEvent.click(buttonNext);

    const nextPokemon = screen.getByText('Charmander');

    expect(nextPokemon).toBeInTheDocument();
  });
});

describe('Testa se a Pokédex tem os botões de filtro', () => {
  const NEXT_POKEMON = 'Próximo pokémon';

  test('Deve existir um botão de filtragem para cada tipo de Pokémon, '
  + 'sem repetição', () => {
    renderWithRouter(<App />);

    const buttonsType = screen.getAllByTestId('pokemon-type-button');
    const TIPOS_POKEMON = 7;

    expect(buttonsType.length).toBe(TIPOS_POKEMON);
  });

  test('A partir da seleção de um botão de tipo, a Pokédex deve circular '
  + 'somente pelos pokémons daquele tipo', () => {
    renderWithRouter(<App />);

    const buttonTypePsy = screen.getByRole('button', {
      name: 'Psychic',
    });

    userEvent.click(buttonTypePsy);

    const pokemonTypePsy = screen.getByTestId('pokemon-type');

    expect(pokemonTypePsy).toHaveTextContent('Psychic');

    const buttonNext = screen.getByRole('button', {
      name: NEXT_POKEMON,
    });

    userEvent.click(buttonNext);

    expect(pokemonTypePsy).toHaveTextContent('Psychic');
  });

  test('O botão All precisa estar sempre visível', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', {
      name: 'All',
    });

    expect(buttonAll).toBeInTheDocument();
  });
});

describe('Testa se a Pokédex contém um botão para resetar o filtro', () => {
  test('O texto do botão deve ser "All"', () => {
    renderWithRouter(<App />);

    const btnAll = screen.getByText('All');

    expect(btnAll).toBeInTheDocument();
  });

  test('A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) '
  + 'quando o botão "All" for clicado', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', {
      name: 'All',
    });

    userEvent.click(allButton);

    const pokemonShow = screen.getByTestId('pokemon-name');

    expect(pokemonShow).toHaveTextContent('Pikachu');

    const buttonNext = screen.getByTestId('next-pokemon');

    userEvent.click(buttonNext);

    expect(pokemonShow).toHaveTextContent('Charmander');
  });
});
