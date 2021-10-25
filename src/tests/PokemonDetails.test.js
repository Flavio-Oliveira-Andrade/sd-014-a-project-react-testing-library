import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './utilitary/renderWithRouter';
import { FAVORITE_POKE } from './utilitary/antiMagicError';
import pokemons from '../data';
import App from '../App';

describe('Tests PokemonDetails component', () => {
  const { name, summary, foundAt } = pokemons[0];
  beforeEach(() => { renderWithRouter(<App />); });

  it('should render the details of the pokémon', () => {
    const detailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    fireEvent.click(detailsLink);
    expect(screen.getByText(`${name} Details`)).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    expect(screen.getByRole('heading', {
      name: /Summary/i,
      level: 2,
    })).toBeInTheDocument();
    expect(screen.getByText(summary)).toBeInTheDocument();
  });

  it('should render the maps and  the locations', () => {
    fireEvent.click(screen.getByRole('link', {
      name: /More details/i,
    }));
    expect(screen.getByRole('heading', {
      name: `Game Locations of ${name}`,
      level: 2,
    })).toBeInTheDocument();
    foundAt.forEach((loc, index) => {
      const image = screen.getAllByRole('img', {
        name: `${name} location`,
      });
      expect(image[index]).toHaveAttribute('src', loc.map);
      expect(image[index]).toHaveAttribute('alt', `${name} location`);
    });
  });

  it('should mark the pokemon as favorite in details page', () => {
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
