import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const isPokemonFavoriteById = { [pokemons[0].id]: false };
    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ isPokemonFavoriteById[pokemons[0].id] }
      />,
    );
    const { averageWeight, name, type, image } = pokemons[0];
    const { value, measurementUnit } = averageWeight;

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName.textContent).toBe(name);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType.textContent).toBe(type);
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight.textContent).toBe(`Average weight: ${value} ${measurementUnit}`);

    const pokemonImg = screen.getByAltText(`${name} sprite`);
    expect(pokemonImg).toHaveAttribute('src', image);
    expect(pokemonImg).toBeInTheDocument();
  });

  test('Teste se o card do Pokémon indicado na Pokédex'
    + 'contém um link de navegação para exibir detalhes', () => {
    const isPokemonFavoriteById = { [pokemons[0].id]: false };
    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ isPokemonFavoriteById[pokemons[0].id] }
      />,
    );

    const { id } = pokemons[0];
    const path = `/pokemons/${id}`;
    const linkMoreDetails = screen.getByRole('link', {
      name: 'More details',
    });
    expect(linkMoreDetails).toBeInTheDocument();
    expect(linkMoreDetails).toHaveAttribute('href', path);
  });

  test(' Teste se ao clicar no link de navegação do Pokémon é feito'
    + 'o redirecionamento da aplicação para a página de detalhes de Pokémons', () => {
    const isPokemonFavoriteById = { [pokemons[0].id]: false };
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ isPokemonFavoriteById[pokemons[0].id] }
      />,
    );
    const { id } = pokemons[0];
    const path = `/pokemons/${id}`;
    const linkMoreDetails = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(linkMoreDetails);
    expect(history.location.pathname).toBe(path);
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const isPokemonFavoriteById = { [pokemons[0].id]: true };
    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ isPokemonFavoriteById[pokemons[0].id] }
      />,
    );
    const { name } = pokemons[0];
    const favoritStarImg = screen.getByAltText(`${name} is marked as favorite`);
    expect(favoritStarImg).toBeInTheDocument();
    expect(favoritStarImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
