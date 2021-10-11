import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Tests the Pokemon Component', () => {
  const testPokemon = pokemons[0];
  const renderTestPokemon = (bool) => renderWithRouter(<Pokemon
    isFavorite={ bool }
    pokemon={ testPokemon }
  />);

  it('should render a card with pokemon info', () => {
    renderTestPokemon(false);
    const name = screen.getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent(testPokemon.name);

    const type = screen.getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();
    expect(type).toHaveTextContent(testPokemon.type);

    const averageWeight = screen.getByTestId('pokemon-weight');
    expect(averageWeight).toBeInTheDocument();

    const { value, measurementUnit } = testPokemon.averageWeight;
    expect(averageWeight)
      .toHaveTextContent = `Average weight: ${value} ${measurementUnit}`;

    const image = screen.getByRole('img', {
      name: `${testPokemon.name} sprite`,
    });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', testPokemon.image);
  });

  it('renders a link to details page', () => {
    const { history } = renderTestPokemon(false);

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', `/pokemons/${testPokemon.id}`);

    userEvent.click(detailsLink);
    expect(history.location.pathname).toBe(`/pokemons/${testPokemon.id}`);
  });

  it('renders a star icon if the pokemon is favorite', () => {
    renderTestPokemon(true);

    const starIcon = screen.getByRole('img', {
      name: `${testPokemon.name} is marked as favorite`,
    });
    expect(starIcon).toBeInTheDocument();
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
