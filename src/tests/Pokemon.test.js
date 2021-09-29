import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../support/renderWithRouter';
import pokemons from '../data';
import { DATA_TESTID, DATA_WEIGHT, DATA_TYPE } from '../support/noMagicStuff';
import App from '../App';

describe('Tests the POKEMON component', () => {
  const {
    id,
    name,
    type,
    averageWeight: { value, measurementUnit },
    image,
  } = pokemons[0];

  it('should render a card with a specified pokemon information', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId(DATA_TESTID)).toHaveTextContent(name);
    expect(screen.getByTestId(DATA_TYPE)).toHaveTextContent(type);
    expect(screen.getByTestId(DATA_WEIGHT))
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(screen.getByAltText(`${name} sprite`)).toHaveAttribute('src', image);
  });
  it('should have a link in the card to go to details page', () => {
    const { history } = renderWithRouter(<App />);
    expect(screen.getByRole('link', {
      name: /More details/i,
    })).toBeDefined();
    fireEvent.click(screen.getByRole('link', {
      name: /More details/i,
    }));
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });
  it('should have a star icon on the favorited pokemon details page', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', {
      name: /More details/i,
    }));
    fireEvent.click(screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    }));
    expect(screen.getByRole('img', {
      name: `${name} is marked as favorite`,
    })).toHaveAttribute('src', '/star-icon.svg');
  });
});
