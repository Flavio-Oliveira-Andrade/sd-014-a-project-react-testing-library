import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('PokemonDetails component test', () => {
  const { name, summary, foundAt } = pokemons[0];

  test('should shown detailed information of the selected Pokémon in the screen', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailsLink);
    expect(moreDetailsLink).not.toBeInTheDocument();

    const summaryHeading = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(summaryHeading).toBeInTheDocument();

    const pokeDetailsHeading = screen.getByRole('heading', {
      name: `${name} Details`,
      level: 2,
    });
    expect(pokeDetailsHeading).toBeInTheDocument();

    const summaryParagraph = screen.getByText(`${summary}`);
    expect(summaryParagraph).toBeInTheDocument();
  });

  test('should exist a section on the page with maps'
  + 'containing the locations of the Pokémon', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailsLink);

    const locationsHeading = screen.getByRole('heading', {
      name: `Game Locations of ${name}`,
      level: 2,
    });
    expect(locationsHeading).toBeInTheDocument();

    foundAt.forEach(({ location, map }, index) => {
      const locationName = screen.getByText(location);
      expect(locationName).toBeInTheDocument();

      const locationImg = screen.getAllByRole('img', {
        name: `${name} location`,
      });
      expect(locationImg[index]).toBeInTheDocument();
      expect(locationImg[index]).toHaveAttribute('src', map);
    });
  });

  test('should the user be able to favorite a pokemon through the details page', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailsLink);

    const favCheckbox = screen.getByRole('checkbox');
    expect(favCheckbox).toBeInTheDocument();
    userEvent.click(favCheckbox);
    expect(favCheckbox).toBeChecked();
    userEvent.click(favCheckbox);
    expect(favCheckbox).not.toBeChecked();

    const favCheckboxLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(favCheckboxLabel).toBeInTheDocument();
  });
});
