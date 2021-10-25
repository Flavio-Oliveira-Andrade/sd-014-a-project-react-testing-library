import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

beforeEach(() => {
  renderWithRouter(<App />);

  const detailsLink = screen.getByRole('link', { name: /More details/i });
  const fireButton = screen.getByRole('button', { name: /Fire/i });

  userEvent.click(fireButton);
  userEvent.click(detailsLink);
});

describe('Tests if the detailed Pokémon information is shown on the screen', () => {
  it('should contain a <name> text, name being the pokemon name', () => {
    const pokeName = screen.getByText('Charmander Details');
    expect(pokeName).toBeInTheDocument();
  });
  it('shoul NOT exist the nav link for details of the selected Pokémon', () => {
    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).not.toHaveTextContent(/More Details/i);
    });
  });
  it('should contain a h2 with the text Summary', () => {
    const h2 = screen.getByRole('heading', { level: 2, name: /Summary/i });
    expect(h2).toBeInTheDocument();
  });
  it('should contain a paragraph with a summary of the specific Pokémon', () => {
    const paragraph = screen.getByText(/The flame on its tail/i);
    expect(paragraph).toBeInTheDocument();
  });
});

describe('Tests if there is a section with maps containing the pokémon locations', () => {
  const KANTO_LOCATIONS = 3;
  const TOTAL_IMAGES = 4;
  it('should contain a h2 with the text Game Locations of (pokemon name here)', () => {
    const h2 = screen.getByRole('heading', { level: 2, name: /Locations of Charma/i });
    expect(h2).toBeInTheDocument();
  });
  it('shows all the Pokémon locations', () => {
    const locations = screen.getAllByText(/Kanto/i);
    expect(locations).toHaveLength(KANTO_LOCATIONS);
    const otherLocation = screen.getByText(/Alola/i);
    expect(otherLocation).toBeInTheDocument();
  });
  it('displays the name and image of each location', () => {
    const locations = screen.getAllByText(/Kanto/i);
    expect(locations).toHaveLength(KANTO_LOCATIONS);
    const otherLocation = screen.getByText(/Alola/i);
    expect(otherLocation).toBeInTheDocument();

    const images = screen.getAllByAltText(/charmander location/i);
    expect(images).toHaveLength(TOTAL_IMAGES);
  });
  it('should have a src attribute with location URL on the location image', () => {
    const URL = 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png';
    const images = screen.getAllByAltText(/charmander location/i);
    expect(images[0]).toHaveAttribute('src', URL);
  });
  it('should have an alt attribute with (pokemon name here) location', () => {
    const images = screen.getAllByAltText(/charmander location/i);
    expect(images).toHaveLength(TOTAL_IMAGES);
  });
});

describe('Tests if the user can favorite a Pokémon on details page', () => {
  it('shows a checkbox that allows the user to favorite the Pokémon', () => {
    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);
    const star = screen.getByAltText(/favorite/i);
    expect(star).toBeInTheDocument();
  });
  it('should add and remove the poke from favorite list, with alternate clicks', () => {
    const checkbox = screen.getByRole('checkbox');
    const star = screen.getByAltText(/favorite/i);
    expect(star).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(star).not.toBeInTheDocument();
  });
  it('should contain the text Pokémon favoritado? on the label of the checkbox', () => {
    const labelText = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(labelText).toBeInTheDocument();
  });
});
