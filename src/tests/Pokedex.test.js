import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../render/renderWithRouter';
import Pokemons from '../data';
import App from '../App';

describe('Testa se aplicação é renderizada para o componente Pokedex', () => {
  test('Se página contém um heading h2 com texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const textEncounteredPokemonsH2 = screen.getByRole('heading',
      {
        name: 'Encountered pokémons',
        level: 2,
      });
    expect(textEncounteredPokemonsH2).toBeInTheDocument();
  });

  test('Se é exibido o próximo Pokemon quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    const buttonTextProximoPokemon = screen.getByRole('button',
      {
        name: 'Próximo pokémon',
      });
    userEvent.click(buttonTextProximoPokemon);
    expect(buttonTextProximoPokemon).toBeInTheDocument();
  });

  test('Se existe um botão para capturar cada tipo de Pokémon', () => {
    renderWithRouter(<App />);
    Pokemons.forEach((pokemon) => {
      const buttonTypePokemon = screen.getByRole('button',
        {
          name: pokemon.type,
        });
      expect(buttonTypePokemon).toBeInTheDocument();
    });
  });

  test('Se cada um dos tipos de pokemon filtrados funciona no clique do botão', () => {
    renderWithRouter(<App />);
    const buttonTypePokemon = screen.getAllByTestId('pokemon-type-button');
    buttonTypePokemon.forEach((typePokemon) => {
      userEvent.click(typePokemon);
      expect(typePokemon).toBeInTheDocument();
    });
  });

  test('Se no botão tem o texto All na tela', () => {
    renderWithRouter(<App />);
    const buttonTextAll = screen.getByRole('button',
      {
        name: 'All',
      });
    userEvent.click(buttonTextAll);
    expect(buttonTextAll).toBeInTheDocument();
  });
});
