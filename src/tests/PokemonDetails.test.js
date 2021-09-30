import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import App from '../App';
import pokemons from '../data';

const isPokemonFavorite = {
  4: true,
  10: true,
  23: true,
  25: true,
  65: true,
  78: true,
  143: true,
  148: true,
  151: true,
};

describe('Testes do componente PokemonDetails', () => {
  it('verifica se as informações do pokemon são mostradas', () => {
    const match = { params: { id: '25' } };
    renderWithRouter(
      <PokemonDetails
        match={ match }
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavorite }
      />,
    );

    const headingDetails = screen.getByRole('heading', {
      level: 2,
      name: `${pokemons[0].name} Details`,
    });
    const detailsLink = screen.queryByRole('link', {
      name: /more details/i,
    });
    const headingSummary = screen.getByRole('heading', {
      level: 2,
      name: /Summary/,
    });
    const paragraphSummary = screen.getByText(pokemons[0].summary);

    expect(headingDetails).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    expect(headingSummary).toBeInTheDocument();
    expect(paragraphSummary).toBeInTheDocument();
  });

  it('Verifica se há uma seção com os mapas e localizações do pokemon', () => {
    const match = { params: { id: '4' } };
    renderWithRouter(
      <PokemonDetails
        match={ match }
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavorite }
      />,
    );

    const mapsHeading = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${pokemons[1].name}`,
    });
    const locations = screen.getAllByRole('img', {
      name: `${pokemons[1].name} location`,
    });

    locations.forEach((location, index) => {
      expect(location.src).toBe(pokemons[1].foundAt[index].map);
      const locationName = screen.getByText(pokemons[1].foundAt[index].location);
      expect(locationName).toBeInTheDocument();
    });

    expect(mapsHeading).toBeInTheDocument();
    expect(locations).toHaveLength(pokemons[1].foundAt.length);
  });

  it('Verifica se o usuário pode favoritar um pokemon', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detailsLink);

    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    const favIconFirst = screen.queryByRole('img', {
      name: /marked as favorite/i,
    });

    expect(favIconFirst).not.toBeInTheDocument();

    userEvent.click(checkbox);
    const favIconSecond = screen.queryByRole('img', {
      name: /marked as favorite/i,
    });
    expect(favIconSecond).toBeInTheDocument();

    userEvent.click(checkbox);
    const favIconThird = screen.queryByRole('img', {
      name: /marked as favorite/i,
    });
    expect(favIconThird).not.toBeInTheDocument();
  });
});
