import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Test Pokemon component', () => {
  const MORE_DETAILS_TEXT = 'More details';

  it('renders a card with the information of a certain Pokémon', () => {
    pokemons.forEach((pokemon) => {
      renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);

      const { averageWeight, image, name, type } = pokemon;
      const { measurementUnit, value } = averageWeight;

      const pokemonName = screen.getByTestId('pokemon-name');
      const pokemonType = screen.getByTestId('pokemon-type');
      const pokemonWeight = screen.getByTestId('pokemon-weight');
      const pokemonImage = screen.getByRole('img');

      expect(pokemonName).toBeInTheDocument();
      expect(pokemonName).toHaveTextContent(name);
      expect(pokemonType).toBeInTheDocument();
      expect(pokemonType).toHaveTextContent(type);
      expect(pokemonWeight).toBeInTheDocument();
      expect(pokemonWeight).toHaveTextContent(
        `Average weight: ${value} ${measurementUnit}`,
      );
      expect(pokemonImage).toBeInTheDocument();
      expect(pokemonImage).toHaveAttribute('src', image);
      expect(pokemonImage).toHaveAttribute('alt', `${name} sprite`);

      // Cleanup is necessary to avoid memory leaks in the test environment
      cleanup();
    });
  });

  it('contains a link to display details on the Pokémon card', () => {
    // The link must have the URL /pokemons/<id>, where <id> is the id of the Pokemon displayed
    pokemons.forEach((pokemon) => {
      renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);

      const link = screen.getByRole('link', { name: MORE_DETAILS_TEXT });

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', `/pokemons/${pokemon.id}`);

      // Cleanup is necessary to avoid memory leaks in the test environment
      cleanup();
    });
  });

  it('redirects to Pokémon details page by clicking on Pokémon link', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: MORE_DETAILS_TEXT }));

    const pokemonDetails = screen.getByRole('heading', { name: /Details/ });
    expect(pokemonDetails).toBeInTheDocument();
  });

  it('changes the URL displayed in the browser to /pokemon/<id>', () => {
    pokemons.forEach((pokemon) => {
      const { history } = renderWithRouter(
        <Pokemon pokemon={ pokemon } isFavorite={ false } />,
      );

      userEvent.click(screen.getByRole('link', { name: MORE_DETAILS_TEXT }));

      // The URL must be /pokemons/<id>, where <id> is the id of the Pokémon displayed
      expect(history.location.pathname).toBe(`/pokemons/${pokemon.id}`);

      // Cleanup is necessary to avoid memory leaks in the test environment
      cleanup();
    });
  });

  it('should be a star icon in favorite Pokémons', () => {
    pokemons.forEach((pokemon) => {
      renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);

      const starIcon = screen.getByRole('img', { name: /favorite/ });

      expect(starIcon).toBeInTheDocument();
      expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
      expect(starIcon).toHaveAttribute(
        'alt',
        `${pokemon.name} is marked as favorite`,
      );

      // Cleanup is necessary to avoid memory leaks in the test environment
      cleanup();
    });
  });
});
