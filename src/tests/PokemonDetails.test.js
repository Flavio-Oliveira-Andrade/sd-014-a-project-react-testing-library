import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Test PokemonDetails component', () => {
  it('shows detailed information of selected Pokémon', () => {
    pokemons.forEach((pokemon) => {
      const { history } = renderWithRouter(<App />);
      const { id, name, summary } = pokemon;

      history.push(`/pokemons/${id}`);

      const pokemonDetails = screen.getByRole('heading', {
        name: `${name} Details`,
      });
      const detailsLink = screen.queryByRole('link', { name: 'More details' });
      const pokemonSummary = screen.getByRole('heading', {
        level: 2,
        name: 'Summary',
      });
      const pokemonSummaryParagraph = screen.getByText(summary);

      expect(pokemonDetails).toBeInTheDocument();
      expect(pokemonSummary).toBeInTheDocument();
      expect(pokemonSummaryParagraph).toBeInTheDocument();
      expect(detailsLink).not.toBeInTheDocument();

      // Cleanup is necessary to avoid memory leaks in the test environment
      cleanup();
    });
  });

  it('should be a section with maps containing the Pokémons locations', () => {
    pokemons.forEach((pokemon) => {
      const { history } = renderWithRouter(<App />);
      const { id, name, foundAt } = pokemon;

      history.push(`/pokemons/${id}`);

      const gameLocationsText = screen.getByRole('heading', {
        level: 2,
        name: `Game Locations of ${name}`,
      });
      expect(gameLocationsText).toBeInTheDocument();

      const locationsImages = screen.getAllByRole('img', {
        name: `${name} location`,
      });
      expect(locationsImages).toHaveLength(foundAt.length);

      foundAt.forEach(({ location, map }) => {
        const locationName = screen.getByText(location);
        expect(locationName).toBeInTheDocument();

        const locationImage = locationsImages.find(({ src }) => src === map);

        expect(locationImage).toBeInTheDocument();
        expect(locationImage).toHaveAttribute('alt', `${name} location`);
      });

      // Cleanup is necessary to avoid memory leaks in the test environment
      cleanup();
    });
  });
});
