import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';

import App from '../App';

describe('Testa o componente Pokedex', () => {
  it('Teste se página contém um heading `h2` com o texto `Encountered pokémons`.', () => {
    renderWithRouter(<App />);
    const pokedexText = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(pokedexText).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista'
  + ' quando o botão `Próximo pokémon` é clicado.', () => {
    renderWithRouter(<App />);
    const nextPokemonBtn = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(nextPokemonBtn).toBeInTheDocument();

    const nextPokemon = screen.getByTestId(/pokemon-name/i);
    userEvent.click(nextPokemonBtn);
    expect(nextPokemon.innerHTML).toBe('Charmander'); // regex não serviu. foi preciso usar a string correta

    userEvent.click(nextPokemonBtn);
    expect(nextPokemon.innerHTML).toBe('Caterpie');
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId(/pokemon-name/i);
    expect(pokemon).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const filterByTypeBtn = screen.getAllByTestId(/pokemon-type-button/i); // getAllBy retorna elemento [] (array) ou error
    filterByTypeBtn.forEach((button, i) => { // faz o for dentro do aaray de elementos
      expect(button).not.toEqual(filterByTypeBtn[i + 1]); // espera que cada botão seja diferente do próximo (i + 1)
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(allBtn);
    expect(allBtn).toBeInTheDocument();
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
});
