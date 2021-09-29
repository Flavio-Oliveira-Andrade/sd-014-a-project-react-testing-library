import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../support/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('PokemonDetails', () => {
  beforeEach(() => { renderWithRouter(<App />); });
  const { name, foundAt, summary } = pokemons[0];

  it('should show the detailed info of selected pokemon', () => {
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

  it('should have a section for the maps and locations', () => {
    fireEvent.click(screen.getByRole('link', {
      name: /More details/i,
    }));
    expect(screen.getByRole('heading', {
      name: `Game Locations of ${name}`,
      level: 2,
    })).toBeInTheDocument();

    foundAt.forEach((loc, index) => {
      const imgLocation = screen.getAllByRole('img', {
        name: `${name} location`,
      });
      expect(imgLocation[index]).toHaveAttribute('src', loc.map);
      expect(imgLocation[index]).toHaveAttribute('alt', `${name} location`);
    });
  });

  it('should be possible to mark a pokemon as favorite on details page', () => {
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
