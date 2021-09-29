import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import { Pokemon } from '../components';

describe('É renderizado um card com as informações de determinado pokémon.', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const firstPokemon = pokemons[0];
    const { averageWeight: { value, measurementUnit }, image, name } = firstPokemon;
    renderWithRouter(
      <Pokemon
        pokemon={ firstPokemon }
        isFavorite={ false }
      />,
    );
    const nameTestID = screen.getByTestId('pokemon-name');
    const nameText = screen.getByText(name);
    const typeTestID = screen.getByTestId('pokemon-type');
    const weightTestID = screen.getByTestId('pokemon-weight');
    const weightText = screen.getByText(`Average weight: ${value} ${measurementUnit}`);
    const SRC = screen.getByRole('img').src;

    expect(nameTestID).toBeInTheDocument();
    expect(nameText).toBeInTheDocument();
    expect(typeTestID.textContent).toBe('Electric');
    expect(weightTestID).toBeInTheDocument();
    expect(weightText).toBeInTheDocument();
    expect(image).toBe(SRC);
  });
  test('Ao Clicar no Link é feito redirecionamento', () => {
    const firstPokemon = pokemons[0];
    const { id } = firstPokemon;
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ firstPokemon }
        isFavorite={ false }
      />,
    );
    const link = screen.getByRole('link', {
      name: 'More details',
    });
    const { href } = link;
    const URL_LINK = `http://localhost/pokemons/${id}`;
    userEvent.click(link);
    const { pathname } = history.location;
    const URL_BROWSER = `/pokemons/${id}`;
    expect(href).toBe(URL_LINK);
    expect(pathname).toBe(URL_BROWSER);
  });
});

describe('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  test('Testar o src e Alt', () => {
    const firstPokemon = pokemons[0];
    const { name } = firstPokemon;
    renderWithRouter(
      <Pokemon
        pokemon={ firstPokemon }
        isFavorite
      />,
    );
    const allImages = screen.getAllByRole('img');
    const favoriteImage = allImages[1];
    const pokemonImage = allImages[0];
    const altImage = pokemonImage.alt;
    const { src, alt } = favoriteImage;
    const SRC_REAL = 'http://localhost/star-icon.svg';
    const ALT_FAV_REAL = `${name} is marked as favorite`;
    const ALT_POK_REAL = `${name} sprite`;
    expect(favoriteImage).toBeInTheDocument();
    expect(src).toBe(SRC_REAL);
    expect(alt).toBe(ALT_FAV_REAL);
    expect(altImage).toBe(ALT_POK_REAL);
  });
});
