import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const nextPokemon = 'next-pokemon';

const fav = {
  25: false,
  4: false,
  10: false,
  23: false,
  65: false,
  151: false,
  78: false,
  143: false,
  148: false,
};

describe('test Pokedex', () => {
  it('should contain h2 with text', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ fav }
    />);
    const heading = screen.getByRole('heading', {
      level: 2,
      nam: /Encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('should show next pokemon from the list', () => {
    renderWithRouter(<Pokedex
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
  it('should appear one pokemon', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ fav }
    />);

    const image = screen.getAllByRole('img');
    expect(image).toHaveLength(1);
  });
});

describe('test filter', () => {
  it('should appear a filter button for every pokemon', () => {
    const LENGTH_BUTTONS = 7;
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ fav }
    />);
    const buttons = screen.getAllByTestId(/pokemon-type-button/i);
    expect(buttons).toHaveLength(LENGTH_BUTTONS);

    const buttonFire = screen.getByText(/fire/i);
    expect(buttonFire).toBeInTheDocument();
  });

  it('should show pokemons of the same type when click the button of the type', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ fav }
    />);

    const fireButton = screen.getByText(/fire/i);
    const nextButton = screen.getByTestId(nextPokemon);
    const typePokemon = screen.getByTestId('pokemon-type');
    userEvent.click(fireButton);
    expect(typePokemon).toHaveTextContent('Fire');
    userEvent.click(nextButton);
    expect(typePokemon).toHaveTextContent('Fire');
  });

  it('all button every appears', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ fav }
    />);

    const pyschButton = screen.getByText(/Psychic/i);
    const nextButton = screen.getByTestId(nextPokemon);
    const allButton = screen.getByText('All');
    userEvent.click(pyschButton);
    expect(allButton).toBeInTheDocument();
    userEvent.click(nextButton);
    expect(allButton).toBeInTheDocument();
  });

  it('all button reset the pokemon order', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ fav }
    />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const nextButton = screen.getByTestId(nextPokemon);
    const allButton = screen.getByText('All');

    userEvent.click(nextButton);
    expect(pokemonName).toHaveTextContent('Charmander');
    userEvent.click(allButton);
    expect(pokemonName).toHaveTextContent('Pikachu');
  });
});
