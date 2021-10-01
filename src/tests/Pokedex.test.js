import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import historyFunction from '../utils/historyFunction';
import App from '../App';

describe('Teste do componente Pokedex', () => {
  test('Teste se página contém um heading', () => {
    const { history } = historyFunction(<App />);
    history.push('/');
    const pokedexTitle = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(pokedexTitle).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão '
  + 'Próximo pokémon é clicado', () => {
    const { history } = historyFunction(<App />);
    history.push('/');
    const nextBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(pokemons[0].name);
    userEvent.click(nextBtn);
    expect(pokemonName).toHaveTextContent(pokemons[1].name);
  });
  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { history } = historyFunction(<App />);
    history.push('/');
    const pokemonName = screen.getAllByTestId(/pokemon-name/);
    expect(pokemonName).toHaveLength(1);
  });
  test('Testa se a Pokédex tem os botões de filtro.', () => {
    const { history } = historyFunction(<App />);
    history.push('/');
    const result = [];
    const pokeType = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const typeFilter = screen.getAllByTestId('pokemon-type-button');
    typeFilter.forEach((type) => result.push(type.innerHTML));
    expect(result).toStrictEqual(pokeType);
  });
  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    const { history } = historyFunction(<App />);
    history.push('/');
    const { name, type, averageWeight: { value, measurementUnit } } = pokemons[0];
    const allTypes = screen.getByRole('button', { name: /all/i });
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');

    expect(allTypes).toBeInTheDocument();
    expect(allTypes.innerHTML).toBe('All');

    userEvent.click(allTypes);
    expect(pokemonName).toHaveTextContent(name);
    expect(pokemonType).toHaveTextContent(type);
    expect(pokemonWeight).toHaveTextContent(
      `Average weight: ${value} ${measurementUnit}`,
    );
  });
});
