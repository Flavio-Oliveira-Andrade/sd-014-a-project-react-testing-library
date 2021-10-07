import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Test <PokemonDetails.js /> component', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link',
      { name: /more details/i });
    userEvent.click(moreDetailsLink);
  });

  it('should show detailed information of the selected Pokémon on the screen', () => {
    const heading = screen.getByRole('heading',
      { name: `${pokemons[0].name} Details`, level: 2 });

    expect(heading).toBeInTheDocument();

    const moreDetailsLink = screen.queryByRole('link',
      { name: /more details/i });

    expect(moreDetailsLink).toBeNull();

    const summaryHeading = screen.getByRole('heading',
      { name: /summary/i, level: 2 });

    expect(summaryHeading).not.toBeEmptyDOMElement();

    const summaryText = screen.getByText(pokemons[0].summary);

    expect(summaryText).toBeInTheDocument();
    expect(summaryText).not.toBeEmptyDOMElement();
  });

  it('should have a section with maps that show where is the Pokémon', () => {
    const gameLocationsHeading = screen.queryByRole('heading',
      { name: `Game Locations of ${pokemons[0].name}` });

    expect(gameLocationsHeading).toBeInTheDocument();

    pokemons[0].foundAt.forEach((place, index) => {
      const location = screen.getByText(place.location);
      const map = screen.getAllByAltText(`${pokemons[0].name} location`);

      expect(location).toBeInTheDocument();
      expect(map[index]).toBeInTheDocument();
      expect(map[index]).toHaveAttribute('src', `${place.map}`);
    });
  });

  it('should allow the user to bookmark a Pokémon through the details page', () => {
    const checkbox = screen.getByRole('checkbox');
    const checkboxLabel = screen.getByText(/pokémon favoritado/i);

    expect(checkbox).toBeInTheDocument();
    expect(checkboxLabel).toBeInTheDocument();

    userEvent.click(checkbox);

    const starIcon = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);

    expect(starIcon).toBeInTheDocument();
  });
});
