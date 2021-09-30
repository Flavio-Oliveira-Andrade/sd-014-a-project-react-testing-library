import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

function scrollPokemons() {
  const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
  pokemons.forEach(({ name }) => {
    const pokemonName = screen.getByText(name);
    expect(pokemonName).toBeInTheDocument();
    userEvent.click(nextBtn);
  });
}

describe('5. Teste o componente <Pokedex.js />:', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  afterEach(() => {
    cleanup();
  });

  it('5.1. se página contém um heading h2 com o texto Encountered pokémons',
    () => {
      const heading = screen.getByRole('heading', { name: /Encountered pokémons/i });
      expect(heading).toBeInTheDocument();
    });

  it('5.2. se é exibido o próximo Pokémon da lista'
  + 'quando o botão Próximo pokémon é clicado',
  () => {
    scrollPokemons();
  });

  it('5.4. se a Pokédex tem os botões de filtro',
    () => {
      const pokemonsType = pokemons.reduce((acc, { type }) => {
        if (!acc.find(({ type: kind }) => kind === type)) {
          return [...acc, {
            type,
            qtd: pokemons.filter(({ type: kind }) => type === kind).length,
          }];
        }
        return acc;
      }, []);
      const buttons = screen.getAllByTestId('pokemon-type-button');
      const allBtn = screen.getByRole('button', { name: /all/i });
      const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
      buttons.forEach((button, index) => {
        expect(button).toHaveTextContent(pokemonsType[index].type);
        userEvent.click(button);
        if (pokemonsType[index].qtd > 1) {
          for (let i = 0; i < pokemonsType[index].qtd; i += 1) {
            const pokesFiltered = pokemons
              .filter(({ type }) => type === pokemonsType[index].type);
            const name = screen.getByText(pokesFiltered[i].name);
            expect(name).toBeInTheDocument();
            userEvent.click(nextBtn);
          }
        }
        expect(allBtn).toBeInTheDocument();
      });
    });

  it('5.5. se a Pokédex contém um botão para resetar o filtro',
    () => {
      const allBtn = screen.getByRole('button', { name: /all/i });
      expect(allBtn).toBeInTheDocument();

      userEvent.click(allBtn);
      scrollPokemons();
    });
});
