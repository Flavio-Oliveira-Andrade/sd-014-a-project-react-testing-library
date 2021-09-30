import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa o componente Pokedex', () => {
  test('se página contém um heading h2 com o texto Encountered pokémons', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const headingPokedex = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(headingPokedex).toBeInTheDocument();
  });

  test('se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const buttonNextPokemon = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(buttonNextPokemon).toBeInTheDocument();
  });

  test('se é mostrado apenas um Pokémon por vez', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const onePokemon = screen.getAllByTestId('pokemon-name');
    expect(onePokemon).toHaveLength(1);
  });

  describe('se a Pokédex tem os botões de filtro', () => {
    test('Deve existir um botão de filtragem para cada tipo de Pokémon', () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const buttonFilter = screen.getByRole('button', {
        name: /Psychic/i,
      });
      const typePokemon = screen.getByTestId('pokemon-type');
      userEvent.click(buttonFilter);
      expect(typePokemon.innerHTML).toEqual('Psychic');
    });

    test('Pokédex deve circular somente pelos pokémons daquele tipo', () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      const typesPokemon = 7;
      const buttonsType = screen.getAllByTestId('pokemon-type-button');

      expect(buttonsType).toHaveLength(typesPokemon);
    });

    test('texto do botão deve corresponder ao nome do tipo, ex. Psychic;', () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      const buttonPsychic = screen.getByRole('button', {
        name: /psychic/i,
      });
      expect(buttonPsychic).toBeInTheDocument();

      userEvent.click(buttonPsychic);
      const pokemon = screen.getByText(/alakazam/i);
      expect(pokemon).toBeInTheDocument();
    });

    test('O botão All precisa estar sempre visível', () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const btnAll = screen.getByRole('button', {
        name: /all/i,
      });
      expect(btnAll).toBeInTheDocument();
    });
  });
  test('se a Pokédex contém um botão para resetar o filtro', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    expect(buttonAll).toBeInTheDocument();

    userEvent.click(buttonAll);
    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();
  });
});
