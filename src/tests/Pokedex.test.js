import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';
import pokemons from '../data';

const numberOfFilters = 7;
const pokemonName = 'pokemon-name';
const nextPokemon = 'Próximo pokémon';

describe('Testes do componente <Pokedex />', () => {
  test('Se página contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    expect(
      screen.getByRole('heading', { name: 'Encountered pokémons', level: 2 }),
    ).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando'
  + ' o botão "Próximo pokémon" é clicado', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', { name: nextPokemon });
    expect(buttonNext).toBeInTheDocument();
    fireEvent.click(buttonNext);
    expect(screen.getByTestId(pokemonName).innerHTML).toBe('Charmander');
  });

  test('Se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('button', { name: nextPokemon }));
    expect(screen.getAllByTestId(pokemonName)).toHaveLength(1);
  });

  test('Se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(filterButtons).toHaveLength(numberOfFilters);
    filterButtons.forEach((button) => {
      // filter retorna um novo array com todos os elementos que satisfazem a condição,
      // para não ter repetição o tamanho do novo array deve ser sempre 1.
      expect(filterButtons.filter((filter) => filter.innerHTML === button.innerHTML))
        .toHaveLength(1);
      fireEvent.click(button);
      // o pokemon que aparece na tela deve ter o mesmo tipo do texto do botão
      expect(button.innerHTML).toBe(screen.getByTestId('pokemon-type').innerHTML);
      // o botão All tem sempre que continuar na tela após clicar nos filtros
      expect(screen.getByText('All')).toBeInTheDocument();
      // pokemonsByType é um array que mostra os pokemons
      // do botão que foi clicado no fireEvent da linha 43
      const pokemonsByType = pokemons
        .filter((pokemon) => pokemon.type === button.innerHTML);
      // o forEach no pokemonsBytype determina a quantidade de vezes que eu vou ver
      // se o tipo do pokemon na tela é igual ao texto do botao e clicar em próximo
      pokemonsByType.forEach(() => {
        expect(screen.getByTestId('pokemon-type').innerHTML).toBe(button.innerHTML);
        fireEvent.click(screen.getByText(nextPokemon));
      });
    });
  });

  test('Se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText('All'));
    expect(screen.getByTestId(pokemonName).innerHTML).toBe(pokemons[0].name);
  });
});
