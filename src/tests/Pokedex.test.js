import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';
import pokemons from '../data';

beforeEach(() => renderWithRouter(<App />));

describe('Componente Pokedex', () => {
  it('Contém um heading h2 com o texto "Encountered pokémons".', () => {
    const h2 = screen.getByRole('heading',
      {
        name: 'Encountered pokémons',
        level: 2,
      });
    expect(h2).toBeInTheDocument();
  });

  it(`É exibido o próximo Pokémon da lista
    quando o botão Próximo pokémon é clicado.`, () => {
    const buttonNext = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(buttonNext).toBeInTheDocument();
    const withoutTheFirst = pokemons.filter((pokemon) => pokemon !== pokemons[0]);
    const pokemonsButtonNext = [...withoutTheFirst, pokemons[0]];
    pokemonsButtonNext.forEach((pokemon) => {
      fireEvent.click(buttonNext);
      const pokemonName = screen.getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();
    });
  });
});

describe('Pokédex tem os botões de filtro.', () => {
  const types = pokemons.reduce((acc, pokemon) => {
    if (!acc.includes(pokemon.type)) {
      acc.push(pokemon.type);
    }
    return acc;
  }, []);

  it('Deve existir um botão de filtragem para cada tipo de pokemons', () => {
    const allButtonsTypes = screen.getAllByTestId('pokemon-type-button');
    types.forEach((type, index) => {
      const buttonType = allButtonsTypes[index];
      expect(buttonType).toBeInTheDocument();
      expect(buttonType).toHaveTextContent(type);
    });
  });

  it(`A partir da seleção de um botão de tipo,
      a Pokédex deve circular somente pelos pokémons daquele tipo.
      O texto do botão deve corresponder ao nome do tipo, ex. Psychic`, () => {
    types.forEach((type) => {
      const button = screen.getByRole('button', { name: type });
      fireEvent.click(button);
      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonType).toHaveTextContent(type);
      const buttonNext = screen.getByRole('button', { name: 'Próximo pokémon' });
      fireEvent.click(buttonNext);
      expect(pokemonType).toHaveTextContent(type);
    });
  });

  it(`A Pokédex contém um botão para resetar o filtro:
      O texto do botão deve ser "All"`, () => {
    const button = screen.getByRole('button', { name: 'All' });
    expect(button).toHaveTextContent('All');
  });

  it('O botão All precisa estar sempre visível.', () => {
    types.forEach((type) => {
      const button = screen.getByRole('button', { name: type });
      fireEvent.click(button);
      const buttonAll = screen.getByRole('button', { name: 'All' });
      expect(buttonAll).toBeInTheDocument();
      expect(buttonAll).toBeVisible();
    });
  });

  it('Ao clicar no botão All, a Pokédex deve voltar ao estado inicial.', () => {
    const buttonAll = screen.getByRole('button', { name: 'All' });
    fireEvent.click(buttonAll);
    const firstPokemon = pokemons[0];
    const pokemonName = screen.getByText(firstPokemon.name);
    expect(pokemonName).toBeInTheDocument();
  });
});
