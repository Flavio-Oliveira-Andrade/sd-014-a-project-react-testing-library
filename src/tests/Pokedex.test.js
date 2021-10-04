import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

const nextPokemon = 'next-pokemon';

describe('Testa o componente Pokedex', () => {
  it('Testa se página contém um heading h2'
  + ' com o texto Encountered pokémons', () => {
    render(<App />, { wrapper: MemoryRouter });
    const pokemonsFound = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
    });
    expect(pokemonsFound).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Pokémon da lista'
    + 'quando o botão Próximo pokémon é clicado.', () => {
    render(<App />, { wrapper: MemoryRouter });
    const nextPokemonButton = screen.getByTestId(nextPokemon);
    const currentPokemon = screen.getByTestId('pokemon-name');
    fireEvent.click(nextPokemonButton);
    expect(currentPokemon.innerHTML).toStrictEqual('Charmander');
  });

  it('Os próximos Pokémons da lista devem ser mostrados,'
    + ' um a um, ao clicar sucessivamente no botão.', () => {
    render(<App />, { wrapper: MemoryRouter });
    const nextPokemonButton = screen.getByTestId(nextPokemon);
    const currentPokemon = screen.getAllByTestId('pokemon-name');
    expect(currentPokemon.length).toStrictEqual(1);
    fireEvent.click(nextPokemonButton);
    expect(currentPokemon.length).toStrictEqual(1);
  });

  it('Testa se a Pokédex tem os botões de filtro por tipo'
    + 'e apenas um botão por tipo', () => {
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

  it('A partir da seleção de um botão de tipo,'
  + 'a Pokédex deve circular somente pelos pokémons daquele tipo;', () => {
    render(<App />, { wrapper: MemoryRouter });
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const type = ['Electric', 'Fire', 'Bug', 'Poison',
      'Psychic', 'Psychic', 'Fire', 'Normal', 'Dragon'];
    typeButtons.forEach((button, index) => {
      const nextPokemonButton = screen.getByTestId(nextPokemon);
      const currentPokemonType = screen.getByTestId('pokemon-type');
      expect(currentPokemonType.innerHTML).toBe(type[index]);
      fireEvent.click(nextPokemonButton);
    });
  });
  it('Testa se existe o botão All e sua funcionalidade', () => {
    render(<App />, { wrapper: MemoryRouter });
    const allButton = screen.getByText('All');
    expect(allButton).toBeInTheDocument();
    const nextPokemonButton = screen.getByTestId(nextPokemon);
    const currentPokemonType = screen.getByTestId('pokemon-type');
    fireEvent.click(nextPokemonButton);
    fireEvent.click(nextPokemonButton);
    fireEvent.click(nextPokemonButton);
    expect(currentPokemonType.innerHTML).toBe('Poison');
    fireEvent.click(allButton);
    expect(currentPokemonType.innerHTML).toBe('Electric');
  });
});
