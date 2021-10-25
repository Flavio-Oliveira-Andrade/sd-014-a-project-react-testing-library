import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './utilitary/renderWithRouter';
import pokemons from '../data';
import { NAME_INFO, WEIGHT_INFO,
  TYPE_INFO, FAVORITE_POKE } from './utilitary/antiMagicError';

describe('Tests Pokemon component', () => {
  const {
    id,
    name,
    type,
    averageWeight: { value, measurementUnit },
    image,
  } = pokemons[0];

  it('should render a specific Pokémon card', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId(NAME_INFO)).toHaveTextContent(name);
    expect(screen.getByTestId(WEIGHT_INFO))
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(screen.getByAltText(`${name} sprite`)).toHaveAttribute('src', image);
    expect(screen.getByTestId(TYPE_INFO)).toHaveTextContent(type);
  });

  it('should the link redirects to details page', () => {
    const { history } = renderWithRouter(<App />);
    expect(screen.getByRole('link', {
      name: /More details/i,
    })).toBeDefined();
    fireEvent.click(screen.getByRole('link', {
      name: /More details/i,
    }));
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  it('should render the star icon for the favorite Pokémon', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', {
      name: /More details/i,
    }));
    fireEvent.click(screen.getByRole('checkbox', {
      name: FAVORITE_POKE,
    }));
    expect(screen.getByRole('img', {
      name: `${name} is marked as favorite`,
    })).toHaveAttribute('src', '/star-icon.svg');
  });
});
