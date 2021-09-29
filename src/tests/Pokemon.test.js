import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('test Pokemon', () => {
  it('should render a card with pokemon information', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const image = screen.getByAltText(/sprite/i);

    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent(
      'Average weight: 6.0 kg',
    );
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('should redirect by click More Details', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[2] }
      isFavorite={ false }
    />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const buttonDetails = screen.getByText('More details');

    expect(pokemonName).toHaveTextContent('Caterpie');
    userEvent.click(buttonDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/10');
  });
  it('should show a star in pokemons with isFavorite', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[4] }
      isFavorite
    />);
    const icon = screen.getByAltText(/is marked as favorite/i);
    expect(icon.src).toBe('http://localhost/star-icon.svg');
    expect(icon.alt).toBe('Alakazam is marked as favorite');
  });
});
