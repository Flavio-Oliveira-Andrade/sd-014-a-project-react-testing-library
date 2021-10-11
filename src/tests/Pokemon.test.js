import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Tests the Pokemon Component', () => {
  const testPokemon = pokemons[0];
  const renderTestPokemon = () => renderWithRouter(<Pokemon
    isFavorite={ false }
    pokemon={ testPokemon }
  />);

  it('should render a card with pokemon info', () => {
    renderTestPokemon();
    const name = screen.getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent(testPokemon.name);

    const type = screen.getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();
    expect(type).toHaveTextContent(testPokemon.type);

    const averageWeight = screen.getByTestId('pokemon-weight');
    expect(averageWeight).toBeInTheDocument();

    const { value, measurementUnit } = testPokemon.averageWeight;
    expect(averageWeight).toHaveTextContent = `${value} ${measurementUnit}`;

    const image = screen.getByRole('img', {
      name: `${testPokemon.name} sprite`,
    });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', testPokemon.image);
  });

  it('renders a link to details page', () => {
    const { history } = renderTestPokemon();

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', `/pokemons/${testPokemon.id}`);

    userEvent.click(detailsLink);
    expect(history.location.pathname).toBe(`/pokemons/${testPokemon.id}`);
  });
});
