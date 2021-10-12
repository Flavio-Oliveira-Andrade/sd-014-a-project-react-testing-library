import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './helper/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Pokemon component test', () => {
  const { id, name, type, averageWeight, image } = pokemons[0];
  const { value, measurementUnit } = averageWeight;

  test('should render a card with the Pokémon information', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toHaveTextContent(name);

    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toHaveTextContent(type);

    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

    const pokeImg = screen.getByAltText(`${name} sprite`);
    expect(pokeImg).toHaveAttribute('src', image);
  });

  test('should the card contains a navigation link'
  + 'to see the Pokémon details page', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

    const moreDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(moreDetailsLink).toBeInTheDocument();
    expect(moreDetailsLink).toHaveAttribute('href', `/pokemons/${id}`);
  });

  test('should the link redirect to the Pokémon details page', () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ false }
      />,
    );

    const moreDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailsLink);
    expect(history.location.pathname).toMatch(`/pokemons/${id}`);
  });

  test('should exist a star icon in favorite Pokemons', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const starIcon = screen.getByAltText(`${name} is marked as favorite`);
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
