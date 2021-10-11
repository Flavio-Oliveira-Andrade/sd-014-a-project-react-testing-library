import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

describe('Tests the PokemonDetails component', () => {
  const detailPokemon = pokemons[0];
  const { id } = detailPokemon;
  const renderWithDetails = () => {
    const isFavoriteObj = { [`${id}`]: false };
    console.log(isFavoriteObj);
    return renderWithRouter(<PokemonDetails
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavoriteObj }
      match={ { params: { id } } }
    />);
  };
  it('should render detailed info about the Pokemon', () => {
    renderWithDetails();
  });
});
