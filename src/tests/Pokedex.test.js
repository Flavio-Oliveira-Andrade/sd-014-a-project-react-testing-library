import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Elementos do componente <Pokedex/>', () => {
  it('A página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const textPokedex = screen.getByRole('heading',
      { name: /encountered pokémons/i, level: 2 });
    expect(textPokedex).toBeInTheDocument();
  });

  it('É exibido o próximo Pokémon da lista quando o botão'
  + '"Próximo pokémon" é clicado', () => {
    renderWithRouter(<App />);
    const btnNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(btnNextPokemon);
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toBeInTheDocument();
  });

  it('É mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemons = screen.getAllByTestId('pokemon-name');
    expect(pokemons).toHaveLength(1);
  });
  it('A Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const lenghtArray = 7;
    const typesPokemon = screen.getAllByTestId('pokemon-type-button');
    expect(typesPokemon).toHaveLength(lenghtArray);

    const btnTypePsychic = screen.getByRole('button', { name: /psychic/i });
    expect(btnTypePsychic).toBeInTheDocument();

    // Circulando pelo tipo de Pokemon
    userEvent.click(btnTypePsychic);
    const firstPokemon = screen.getByText(/alakazam/i);
    expect(firstPokemon).toBeInTheDocument();
    const btnNext = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(btnNext);
    const secondPokemon = screen.getByText(/mew/i);
    expect(secondPokemon).toBeInTheDocument();
    userEvent.click(btnNext);
    expect(firstPokemon).toBeInTheDocument();
  });

  it('O botão All  está sempre visível na tela inicial e quando clicado mostra'
  + ' os pokemons normalmente, sem filtros', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);
    const pokemon = screen.getByText(/pikachu/i);
    expect(pokemon).toBeInTheDocument();
  });
});
