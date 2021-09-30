import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const isPokemonFavorite = {
  4: true,
  10: true,
  23: true,
  25: true,
  65: true,
  78: true,
  143: true,
  148: true,
  151: true,
};

describe('Testa se o componente Pokemon é renderizado corretamente', () => {
  it('Verifica se o card do pokemon é renderizado com as informações corretas', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ isPokemonFavorite[pokemons[0].id] }
      />,
    );

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByRole('img', { name: `${pokemons[0].name} sprite` });

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(pokemons[0].name);
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(pokemons[0].type);
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight).toHaveTextContent(
      'Average weight: '
      + `${pokemons[0].averageWeight.value} ${pokemons[0].averageWeight.measurementUnit}`,
    );
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage.src).toBe(pokemons[0].image);
  });

  it('Verifica se o card renderizado possui um link para mostrar detalhes', () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[1] }
        isFavorite={ isPokemonFavorite[pokemons[1].id] }
      />,
    );

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    expect(detailsLink).toBeInTheDocument();

    userEvent.click(detailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[1].id}`);
  });

  it('Verifica se existe um ícone de estrelas nos pokemons favoritados', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[2] }
        isFavorite={ isPokemonFavorite[pokemons[2].id] }
      />,
    );

    const favoriteIcon = screen.getByRole('img', {
      name: `${pokemons[2].name} is marked as favorite`,
    });
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon.src).toBe('http://localhost/star-icon.svg');
  });
});
