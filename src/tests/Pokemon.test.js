import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Requirement - 6 : Pokemon', () => {
  it('should render pokemon card with correct infos', () => {
    pokemons.forEach((pokemon) => {
      renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);
      const { value, measurementUnit } = pokemon.averageWeight;
      const pokemonName = screen.getByTestId('pokemon-name');
      const pokemonType = screen.getByTestId('pokemon-type');
      const pokemonWeight = screen.getByTestId('pokemon-weight');
      const weightExpect = `Average weight: ${value} ${measurementUnit}`;
      const pokemonImg = screen.getByRole('img');
      expect(pokemonName).toHaveTextContent(pokemon.name);
      expect(pokemonType).toHaveTextContent(pokemon.type);
      expect(pokemonWeight).toHaveTextContent(weightExpect);
      expect(pokemonImg).toBeInTheDocument();
      expect(pokemonImg.src).toBe(pokemon.image);
      expect(pokemonImg.alt).toBe(`${pokemon.name} sprite`);
      cleanup();
    });
  });
  it('must have link to Pokémon details and redirect correctly', () => {
    pokemons.forEach((pokemon) => {
      const {
        history,
      } = renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);

      const link = screen.getByRole('link', { name: 'More details' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', `/pokemons/${pokemon.id}`);
      expect(history.location.pathname).not.toBe(`/pokemons/${pokemon.id}`);
      fireEvent.click(link);
      expect(history.location.pathname).toBe(`/pokemons/${pokemon.id}`);
      cleanup();
    });
  });
  it('must have star icon in favorite pokemons', () => {
    pokemons.forEach((pokemon, index) => {
      const isFav = index % 2 === 0;
      renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ isFav } />);
      if (isFav) {
        const pokemonImg = screen.getAllByRole('img')[1];
        expect(pokemonImg).toBeInTheDocument();
        expect(pokemonImg.src.endsWith('/star-icon.svg')).toBeTruthy();
        expect(pokemonImg.alt).toBe(`${pokemon.name} is marked as favorite`);
      } else {
        const pokemonImg = screen.getAllByRole('img')[1];
        expect(pokemonImg).toBeUndefined();
      }
      cleanup();
    });
  });
});
