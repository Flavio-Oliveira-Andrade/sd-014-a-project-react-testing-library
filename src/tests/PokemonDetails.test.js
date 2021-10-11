import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

describe('Tests the PokemonDetails component', () => {
  const detailPokemon = pokemons[0];
  let { id } = detailPokemon;
  const renderWithDetails = () => {
    const isFavoriteObj = { [`${id}`]: false };
    id += '';
    return renderWithRouter(<PokemonDetails
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavoriteObj }
      match={ { params: { id } } }
      onUpdateFavoritePokemons={ () => null }
    />);
  };

  it('should render detailed info about the Pokemon', () => {
    renderWithDetails();

    const detailsTitle = screen.getByRole('heading', {
      name: `${detailPokemon.name} Details`,
      level: 2,
    });
    expect(detailsTitle).toBeInTheDocument();

    const detailsLink = screen.queryByRole('link', {
      name: /more details/i,
    });
    expect(detailsLink).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(summary).toBeInTheDocument();

    const summaryP = screen.getByText(detailPokemon.summary);
    expect(summaryP).toBeInTheDocument();
  });

  it('should render a location section with maps', () => {
    renderWithDetails();

    const locationHeading = screen.getByRole('heading', {
      name: `Game Locations of ${detailPokemon.name}`,
      level: 2,
    });
    expect(locationHeading).toBeInTheDocument();

    detailPokemon.foundAt.forEach(({ location, map }) => {
      const thisLocation = screen.getByText(location);
      expect(thisLocation).toBeInTheDocument();
    });

    const maps = screen.getAllByRole('img', {
      name: /location$/i,
    });
    expect(maps.length).toBe(detailPokemon.foundAt.length);
  });
});
