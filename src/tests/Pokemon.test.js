import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import { pokemons, isPokemonFavoriteById } from './mocks/pokeMocks';

import Pokemon from '../components/Pokemon';

describe('Componente Pokemon', () => {
  test('renderiza card com informações sobre um Pokémon', () => {
    const { id, name, type, averageWeight, image: imagePath } = pokemons[0];
    const { value, measurementUnit } = averageWeight;

    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ isPokemonFavoriteById[id] }
      />,
    );

    const pkmnName = screen.getByTestId('pokemon-name').innerHTML;
    const pkmnType = screen.getByTestId('pokemon-type').innerHTML;
    const pkmnWeight = screen.getByTestId('pokemon-weight').innerHTML;
    const pkmnImage = screen.getByRole('img', { name: `${name} sprite` });

    expect(pkmnName).toBe(name);
    expect(pkmnType).toBe(type);
    expect(pkmnWeight).toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(pkmnImage.src).toBe(imagePath);
  });

  test('renderiza um link para detalhes do Pokémon', () => {
    const { id } = pokemons[0];

    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ isPokemonFavoriteById[id] }
      />,
    );

    const detailsLink = screen.getByRole('link', { name: /details/i });
    userEvent.click(detailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  test('renderiza uma estrela para um Pokémon favoritado', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const favoriteStar = screen.getByRole('img',
      { name: `${pokemons[0].name} is marked as favorite` });
    expect(favoriteStar).toBeInTheDocument();
    expect(favoriteStar.src.match(/star-icon.svg$/i)).toHaveLength(1);
  });

  test('não renderiza uma estrela para um Pokémon não favoritado', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);
    const favoriteStar = screen.queryByRole('img', { name: /marked as favorite/i });
    expect(favoriteStar).not.toBeInTheDocument();
  });
});
