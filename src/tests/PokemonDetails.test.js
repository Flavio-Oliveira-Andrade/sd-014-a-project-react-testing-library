import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import pokemons from '../data';

const MOCKED_PKM = pokemons[0];
const { name, summary, foundAt } = MOCKED_PKM;

describe('tests PokemonDetails.js component', () => {
  it('renders the title text as "Pokémon\'s name details", '
  + 'and does not render the "More details" link', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More details/ });
    userEvent.click(detailsLink);

    const title = screen.getByText(`${name} Details`);
    expect(title).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
  });

  it('renders a title "Summary", '
  + 'this section renders a brief abstract about that specific pokémon', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More details/ });
    userEvent.click(detailsLink);

    const summaryTitle = screen.getByRole('heading', {
      level: 2,
      name: /Summary/,
    });
    expect(summaryTitle).toBeInTheDocument();

    const abstract = screen.getByText(summary);
    expect(abstract).toBeInTheDocument();
  });

  it('renders a maps section '
  + 'that contains the locations where that specific pokémon can be found', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More details/ });
    userEvent.click(detailsLink);

    const locationsTitle = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${name}`,
    });
    expect(locationsTitle).toBeInTheDocument();

    const locations = screen.getAllByAltText(`${name} location`);
    expect(locations).toHaveLength(foundAt.length);

    foundAt.forEach((location, index) => {
      expect(locations[index]).toBeInTheDocument();
      expect(locations[index]).toHaveAttribute('src', location.map);
    });
  });

  it('renders a checkbox to favorite the pokémon on screen', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More details/ });
    userEvent.click(detailsLink);

    const favCheckbox = screen.getByRole('checkbox', { name: /Pokémon favoritado?/ });
    expect(favCheckbox).toBeInTheDocument();
    expect(favCheckbox.checked).toBe(false);

    userEvent.click(favCheckbox);
    expect(favCheckbox.checked).toBe(true);

    const favIcon = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(favIcon).toBeInTheDocument();
    expect(favIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(favIcon).toHaveAttribute('alt', `${name} is marked as favorite`);
  });
});
