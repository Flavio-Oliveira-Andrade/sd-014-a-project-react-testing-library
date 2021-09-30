import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import PokemonDetails from '../components/PokemonDetails';
import renderWithRouter from './auxiliary-tools/renderWithRouter';
import pokemons from '../data';

describe('Pokemon Details is functioning properly', () => {
  it('Displays the pokémon details on the page', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText('More details');
    userEvent.click(moreDetails);

    const pkmn = screen.getByRole('heading',
      { name: `${pokemons[0].name} Details`, level: 2 });
    const summaryHeading = screen.getByRole('heading', { name: 'Summary' });
    const summaryText = screen.getByText('This intelligent Pokémon roasts hard berries'
    + ' with electricity to make them tender enough to eat.');

    expect(pkmn).toBeInTheDocument();
    expect(summaryHeading).toBeInTheDocument();
    expect(summaryText.innerHTML).toBe(pokemons[0].summary);
    expect(moreDetails).not.toBeInTheDocument();
  });

  it('Displays maps of the pokemon location', () => {
    // renderWithRouter(<App />);
    // const moreDetails = screen.getByText('More details');
    // userEvent.click(moreDetails);

    renderWithRouter(<PokemonDetails
      match={ { params: { id: '25' } } }
      pokemons={ pokemons }
      isPokemonFavoriteById={ { 25: true } }
    />);

    const locationHeading = screen.getByRole('heading',
      { name: `Game Locations of ${pokemons[0].name}` });
    const pkmnMaps = screen.getAllByRole('img', { name: `${pokemons[0].name} location` });

    expect(locationHeading).toBeInTheDocument();
    expect(pkmnMaps.length).toBe(pokemons[0].foundAt.length);
    expect(pkmnMaps[0].src).toBe(pokemons[0].foundAt[0].map);
    expect(pkmnMaps[0].alt).toBe(`${pokemons[0].name} location`);
  });

  it('Allows to favorite a pokemon within the More Details page', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText('More details');
    userEvent.click(moreDetails);

    const addFavorite = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(addFavorite);

    const favStar = screen.getByRole('img',
      { name: `${pokemons[0].name} is marked as favorite` });
    expect(favStar).toBeInTheDocument();
  });
});
