import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

const followingPokemon = 'Próximo pokémon';

describe('Testa o componente `<Pokedex.js />`', () => {
  test('A página contém um h2 com o texto Encountered pokémons', () => {
    render(<App />, { wrapper: MemoryRouter });
    const pokemonsFound = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
    });
    expect(pokemonsFound).toBeInTheDocument();
  });

  test('Exibe o próximo Pokémon da lista quando o botão é clicado.', () => {
    render(<App />, { wrapper: MemoryRouter });
    const followingPokemonButton = screen.getByText(followingPokemon);
    const actualPokemon = screen.getByTestId('pokemon-name');
    fireEvent.click(followingPokemonButton);
    expect(actualPokemon.innerHTML).toStrictEqual('Charmander');
  });

  test('Os próximos Pokémons da lista devem ser mostrados.', () => {
    render(<App />, { wrapper: MemoryRouter });
    const followingPokemonButton = screen.getByText(followingPokemon);
    const actualPokemon = screen.getAllByTestId('pokemon-name');
    expect(actualPokemon.length).toStrictEqual(1);
    fireEvent.click(followingPokemonButton);
    expect(actualPokemon.length).toStrictEqual(1);
  });

  test('A Pokédex tem os botões de filtro por , tipo e apenas um botão por tipo', () => {
    render(<App />, { wrapper: MemoryRouter });
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const types = ['Electric', 'Fire', 'Bug',
      'Poison', 'Psychic', 'Normal', 'Dragon'];
    typeButtons.forEach((button, index) => {
      expect(typeButtons[index]).toHaveTextContent(types[index]);
      expect(button.innerHTML).toBe(types[index]);
      const test1 = button.innerHTML.includes(types);
      const test2 = button.innerHTML.includes(types[index]);
      expect(test1).toBe(false);
      expect(test2).toBe(true);
    });
  });

  test('A Pokédex deve marcar por  tipo, quando selecionado;', () => {
    render(<App />, { wrapper: MemoryRouter });
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const type = ['Electric', 'Fire', 'Bug', 'Poison',
      'Psychic', 'Psychic', 'Fire', 'Normal', 'Dragon'];
    typeButtons.forEach((button, index) => {
      const followingPokemonButton = screen.getByText(followingPokemon);
      const actualPokemonType = screen.getByTestId('pokemon-type');
      expect(actualPokemonType.innerHTML).toBe(type[index]);
      fireEvent.click(followingPokemonButton);
    });
  });

  test('Testa se existe o botão All e sua funcionalidade', () => {
    render(<App />, { wrapper: MemoryRouter });
    const allButton = screen.getByText('All');
    expect(allButton).toBeInTheDocument();
    const followingPokemonButton = screen.getByText(followingPokemon);
    const actualPokemonType = screen.getByTestId('pokemon-type');
    fireEvent.click(followingPokemonButton);
    fireEvent.click(followingPokemonButton);
    fireEvent.click(followingPokemonButton);
    expect(actualPokemonType.innerHTML).toBe('Poison');
    fireEvent.click(allButton);
    expect(actualPokemonType.innerHTML).toBe('Electric');
  });
});
