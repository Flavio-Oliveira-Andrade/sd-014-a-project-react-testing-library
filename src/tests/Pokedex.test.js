import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../util/RenderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('', () => {
  test('h2 com o texto "encountered pokemons"', () => {
    RenderWithRouter(<App />);

    const pokEncontrados = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(pokEncontrados.innerHTML).toBe('Encountered pokémons');
  });

  test('testando proximo pokemon', () => {
    RenderWithRouter(<App />);
    const buttonProximoPokemon = screen.getByTestId('next-pokemon');
    const nomeDoPrimeroPok = screen.getByText(`${pokemons[0].name}`);
    expect(nomeDoPrimeroPok).toBeInTheDocument();

    const proximoPokemon = screen.getByText('Próximo pokémon');
    expect(proximoPokemon).toBeInTheDocument();

    userEvent.click(buttonProximoPokemon);

    const verificandoPokemon = screen.getByTestId('pokemon-name').innerHTML;
    expect(verificandoPokemon).toBe(`${pokemons[1].name}`);
    expect(buttonProximoPokemon).toBeInTheDocument();

    const proximoPokemon2 = screen.getByText('Próximo pokémon');
    expect(proximoPokemon2).toBeInTheDocument();
  });

  test('renderizando um pokemon por vez', () => {
    RenderWithRouter(<App />);
    const pokemonRef = screen.getAllByTestId('pokemon-name');
    expect(pokemonRef).toHaveLength(1);
  });

  test('teste se aparece os pokemons com seu respectivo tipo', () => {
    RenderWithRouter(<App />);
    const buttonTypebutton = screen.getAllByTestId('pokemon-type-button');
    expect(buttonTypebutton[0].innerHTML).toBe('Electric');

    userEvent.click(buttonTypebutton[1]);
    expect(buttonTypebutton[1].innerHTML).toBe('Fire');

    userEvent.click(buttonTypebutton[2]);
    expect(buttonTypebutton[2].innerHTML).toBe('Bug');

    userEvent.click(buttonTypebutton[3]);
    expect(buttonTypebutton[3].innerHTML).toBe('Poison');

    userEvent.click(buttonTypebutton[4]);
    expect(buttonTypebutton[4].innerHTML).toBe('Psychic');

    userEvent.click(buttonTypebutton[5]);
    expect(buttonTypebutton[5].innerHTML).toBe('Normal');

    userEvent.click(buttonTypebutton[6]);
    expect(buttonTypebutton[6].innerHTML).toBe('Dragon');
  });

  test('testando se existe o botão "All"', () => {
    RenderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(buttonAll);
    expect(buttonAll.innerHTML).toBe('All');
  });
});
