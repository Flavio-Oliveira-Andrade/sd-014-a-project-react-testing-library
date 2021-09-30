import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import pokemons from '../data';
import App from '../App';

const { name, summary, foundAt } = pokemons[0];
const linkOptions = { name: 'More details' };

describe('Requirement - 7 : PokemonDetails', () => {
  it('must render details info about selected pokemon', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', linkOptions);
    fireEvent.click(link);
    const details = screen.getByRole('heading', {
      level: 2,
      name: `${name} Details`,
    });
    const summaryH2 = screen.getByRole('heading', { level: 2, name: 'Summary' });
    const summaryText = screen.getByText(summary);
    expect(details).toBeInTheDocument();
    expect(link).not.toBeInTheDocument();
    expect(summaryH2).toBeInTheDocument();
    expect(summaryText).toBeInTheDocument();
  });
  it('must have a section with the maps including pokemon location', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', linkOptions));
    const text = screen.getByRole('heading', {
      level: 2, name: `Game Locations of ${name}` });
    const maps = screen.getAllByAltText(`${name} location`);
    expect(text).toBeInTheDocument();
    foundAt.forEach(({ location, map }, index) => {
      expect(maps[index].src).toBe(map);
      expect(screen.getByText(location)).toBeInTheDocument();
    });
  });
  it('must have a checkbox to favorite pokemon', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', linkOptions));
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBeFalsy();
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBeTruthy();
    const favorite = screen.getByAltText(`${name} is marked as favorite`);
    expect(favorite).toBeInTheDocument();
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBeFalsy();
    expect(favorite).not.toBeInTheDocument();
    expect(screen.getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
  });
});
