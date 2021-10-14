import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica o componente <Pokedex.js />', () => {
  it('Verifica se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);
    const pokedexTitle = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(pokedexTitle).toBeInTheDocument();
  });

  it('Verifica se é exibido o próximo Pokémon da lista '
   + 'quando o botão Próximo pokémon é clicado.', () => {
    renderWithRouter(<App />);
    const nextBtn = screen.getByTestId('next-pokemon');
    expect(nextBtn).toBeInTheDocument();
    userEvent.click(nextBtn);
    const pokemonName = screen.getByText(/charmander/i);
    expect(pokemonName).toBeInTheDocument();
  });

  it('Verifica se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const nextBtn = screen.getByTestId('next-pokemon');
    userEvent.click(nextBtn);
    const pokemonsLength = screen.getAllByTestId('pokemon-name');
    expect(pokemonsLength).toHaveLength(1);
  });

  it('Verifica se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const MAX_TYPES = 7;
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons).toHaveLength(MAX_TYPES);

    const electricButton = screen.getByRole('button', { name: /electric/i });
    userEvent.click(electricButton);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');
  });

  it('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const all = screen.getByRole('button', { name: /all/i });
    const electricButton = screen.getByRole('button', { name: /electric/i });
    userEvent.click(electricButton);
    userEvent.click(all);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
});
