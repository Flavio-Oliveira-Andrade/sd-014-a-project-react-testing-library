import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(
      <App />,
    );
    const encounteredPokemonText = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(encounteredPokemonText).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista '
  + 'quando o botão Próximo pokémon é clicado.', () => {
    renderWithRouter(
      <App />,
    );
    const buttonNext = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(buttonNext).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(
      <App />,
    );
    const onePokemon = screen.getAllByTestId('next-pokemon');

    expect(onePokemon).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(
      <App />,
    );
    const filterPokemonButton = screen.getByRole('button', {
      name: /psychic/i,
    });
    const filterPokemonType = screen.getByTestId('pokemon-type');

    userEvent.click(filterPokemonButton);

    expect(filterPokemonType.innerHTML).toEqual('Psychic');
  });

  it('A Pokédex deve circular somente pelos pokémons daquele tipo;', () => {
    renderWithRouter(
      <App />,
    );
    const buttonType = screen.getAllByTestId('pokemon-type-button');
    const pokemonsTypeNumber = 7;

    expect(buttonType).toHaveLength(pokemonsTypeNumber); // Referencia https://jestjs.io/pt-BR/docs/expect#tohavelengthnumber
  });

  it('O texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
    renderWithRouter(
      <App />,
    );
    const buttonPsychic = screen.getByRole('button', {
      name: /psychic/i,
    });
    const buttonText = screen.getByText(/psychic/i);
    userEvent.click(buttonPsychic);
    expect(buttonText).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(
      <App />,
    );
    const resetFilterButton = screen.getByRole('button', {
      name: /all/i,
    });
    const loadingPage = screen.getByText(/pikachu/i);

    userEvent.click(resetFilterButton);

    expect(loadingPage).toBeInTheDocument();
  });
});
