import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';

beforeEach(() => renderWithRouter(<App />));

describe('Testa o componente Pokédex', () => {
  test('A página possui um h2 com o texto Encountered pokémons', () => {
    const h2 = screen.getByRole('heading',
      {
        level: 2,
        name: 'Encountered pokémons',
      });
    expect(h2).toBeInTheDocument();
  });

  test(`É exibido o próximo Pokémon da lista
    quando o botão Próximo pokémon é clicado.`, () => {
    const nextPokemonButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextPokemonButton).toBeInTheDocument();
    const filteredPokemons = pokemons.filter((pokemon) => pokemon !== pokemons[0]);
    const alteredPokemons = [...filteredPokemons, pokemons[0]];
    alteredPokemons.forEach((pokemon) => {
      fireEvent.click(nextPokemonButton);
      const pokemonName = screen.getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();
    });
  });

  const pokemonTypes = pokemons.reduce((acc, pokemon) => {
    if (!acc.includes(pokemon.type)) {
      acc.push(pokemon.type);
    }
    return acc;
  }, []);

  it('Existe um botão de filtragem para cada tipo de pokémon', () => {
    const filterByTypeButton = screen.getAllByTestId('pokemon-type-button');
    pokemonTypes.forEach((type, index) => {
      const typeButton = filterByTypeButton[index];
      expect(typeButton).toBeInTheDocument();
      expect(typeButton).toHaveTextContent(type);
    });
  });

  it(`Ao selecionar um tipo,
      a Pokédex renderiza apenas os pokémons daquele tipo`, () => {
    pokemonTypes.forEach((type) => {
      const button = screen.getByRole('button', { name: type });
      fireEvent.click(button);
      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonType).toHaveTextContent(type);
      const nextPokemonButton = screen.getByRole('button', { name: 'Próximo pokémon' });
      fireEvent.click(nextPokemonButton);
      expect(pokemonType).toHaveTextContent(type);
    });
  });

  it('A Pokédex contém um botão para resetar o filtro', () => {
    const button = screen.getByRole('button', { name: 'All' });
    expect(button).toHaveTextContent('All');
  });

  it('O botão All está sempre visível', () => {
    pokemonTypes.forEach((type) => {
      const button = screen.getByRole('button', { name: type });
      fireEvent.click(button);
      const allButton = screen.getByRole('button', { name: 'All' });
      expect(allButton).toBeInTheDocument();
      expect(allButton).toBeVisible();
    });
  });

  it('Ao clicar no botão All, a Pokédex volta ao estado inicial', () => {
    const allButton = screen.getByRole('button', { name: 'All' });
    fireEvent.click(allButton);
    const firstPokemon = pokemons[0];
    const pokemonName = screen.getByText(firstPokemon.name);
    expect(pokemonName).toBeInTheDocument();
  });
});
