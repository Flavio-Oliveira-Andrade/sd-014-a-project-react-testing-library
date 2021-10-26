import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/RenderWithRoute';

import { PokemonDetails } from '../components';
import pokemons from '../data';

const match = {
  path: '/pokemons/:id', url: '/pokemons/25', isExact: true, params: { id: '25' } };

describe('Test PokemonDetails component', () => {
  test('A página deve conter um texto <name> Details,'
  + 'onde <name> é o nome do Pokémon;', () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById
        match={ match }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
          this.onUpdateFavoritePokemons(pokemonId, isFavorite)
        ) }
      />,
    );

    const pokeDetails = screen.getByRole('heading', {
      name: `${pokemons[0].name} Details`,
    });
    expect(pokeDetails).toBeInTheDocument();
  });

  test('Não deve existir o link de navegação para os detalhes.', () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById
        match={ match }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
          this.onUpdateFavoritePokemons(pokemonId, isFavorite)
        ) }
      />,
    );

    const moreDetailsLink = screen.queryByRole('link', { name: /details/i });
    expect(moreDetailsLink).not.toBeInTheDocument();
  });
  test('Debe mostrar detalhes sobre o Pokemon', () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById
        match={ match }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
          this.onUpdateFavoritePokemons(pokemonId, isFavorite)
        ) }
      />,
    );
    const paragraf = screen.getByText(
      /This intelligent Pokémon roasts hard berries/i, { selector: 'p' },
    );

    const summary = screen.getByRole('heading', {
      name: /summary/i,
    });
    expect(paragraf).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
  });
  // Com ajuda do colega romano 'Juluis Cesar'
  test('Na seção de detalhes deverá existir um heading h2'
  + 'com o texto Game Locations of ', () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById
        match={ match }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
          this.onUpdateFavoritePokemons(pokemonId, isFavorite)
        ) }
      />,
    );
    const locationsTittle = screen.getByRole('heading', {
      name: `Game Locations of ${pokemons[0].name}`,
      level: 2,
    });
    const pokeMapa1 = screen.getAllByRole('img')[1];
    expect(locationsTittle).toBeInTheDocument();
    expect(pokeMapa1).toHaveAttribute('src', `${pokemons[0].foundAt[0].map}`);
    expect(pokeMapa1).toHaveAttribute('alt', `${pokemons[0].name} location`);

    const pokeMapa2 = screen.getAllByRole('img')[2];
    expect(locationsTittle).toBeInTheDocument();
    expect(pokeMapa2).toHaveAttribute('src', `${pokemons[0].foundAt[1].map}`);
    expect(pokeMapa2).toHaveAttribute('alt', `${pokemons[0].name} location`);
  });
  test('Teste se pode favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById
        match={ match }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
          this.onUpdateFavoritePokemons(pokemonId, isFavorite)
        ) }
      />,
    );
    const checkbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(checkbox).toBeInTheDocument();
  });
});
