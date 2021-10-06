import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemons from '../data';

describe('Test <Pokemon.js /> component', () => {
  it('should render a card with Pokémon info', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);
    const {
      averageWeight: {
        measurementUnit,
        value },
      image,
      name,
      type,
    } = pokemons[0];

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByAltText(`${name} sprite`);

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonImage).toBeInTheDocument();

    expect(pokemonName).toHaveTextContent(name);
    expect(pokemonType).toHaveTextContent(type);
    expect(pokemonWeight)
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(pokemonImage).toHaveAttribute('src', image);
  });

  it('should contain a navigation link to view the details of a Pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

    const linkToDetails = screen.getByRole('link', { name: /More details/i });

    expect(linkToDetails).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
    expect(linkToDetails).toBeInTheDocument();
  });

  it('should redirect the application to the Pokémon details page.', () => {
    renderWithRouter(<App />);

    const linkToDetails = screen.getByRole('link', { name: /More details/i });

    userEvent.click(linkToDetails);

    const pokemonDetailsTitle = screen.getByRole('heading',
      { name: `${pokemons[0].name} Details`,
        level: 2,
      });

    expect(pokemonDetailsTitle).not.toBeNull();
  });

  it('should change to "/pokemon/<id>" of the itemized Pokemon you want to see', () => {
    const { history } = renderWithRouter(<App />);
    const linkToDetails = screen.getByRole('link', { name: /More details/i });

    userEvent.click(linkToDetails);

    const { location: { pathname } } = history;

    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('should have a star icon in favorite Pokemons', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const starIcon = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);

    expect(starIcon).toBeInTheDocument();
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
