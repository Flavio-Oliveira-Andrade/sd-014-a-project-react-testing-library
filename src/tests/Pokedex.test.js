import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import RenderWithRouter from '../RenderWithRouter';

const fav = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Testes para o Pokedex.js', () => {
  test('Testa se existe um Heading h2 com o texto "Encountered pokémons"', () => {
    RenderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ fav }
    />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(heading).toBeInTheDocument();
  });

  test('Testa se é exibido o proximo pokemon ao clicar no button', () => {
    RenderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ fav }
    />);

    const button = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    userEvent.click(button);
    const textPokemon = screen.getByText(/charmander/i);
    expect(textPokemon).toBeInTheDocument();
  });

  test('Verifica se é renderizado apenas 1 pokemon', () => {
    RenderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ fav }
    />);

    const imgPoke = screen.getAllByRole('img');
    expect(imgPoke.length).toBe(1);
  });
});

describe('Testes dos botões da pokedex', () => {
  test('Testa se existe 1 botão para cada tipo de pokemon', () => {
    const maxLenghtButton = 7;
    RenderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ fav }
    />);

    const typePokeButton = screen.getAllByTestId('pokemon-type-button');
    expect(typePokeButton.length).toBe(maxLenghtButton);
  });

  test('Verifica se ao clicar no botão ELe circula somente nos pokemons do tipo', () => {
    RenderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ fav }
    />);

    const fireButton = screen.getByText(/fire/i);
    const nextButton = screen.getByTestId('next-pokemon');
    const typePokemon = screen.getByTestId('pokemon-type');
    userEvent.click(fireButton);
    expect(typePokemon).toHaveTextContent('Fire');
    userEvent.click(nextButton);
    expect(typePokemon).toHaveTextContent('Fire');
  });

  test('Verifica se o botão de resetar filtro funciona', () => {
    RenderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ fav }
    />);

    const allButton = screen.getByText(/All/i);
    const nextButton = screen.getByTestId('next-pokemon');
    const typePokemon = screen.getByTestId('pokemon-type');
    userEvent.click(allButton);
    expect(typePokemon).toHaveTextContent('Electric');
    userEvent.click(nextButton);
    expect(typePokemon).toHaveTextContent('Fire');
  });
});
