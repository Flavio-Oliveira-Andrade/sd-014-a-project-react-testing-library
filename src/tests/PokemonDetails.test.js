import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

describe('Testa o componente "PokemonDetails"', () => {
  const { name, summary, foundAt } = pokemons[0];

  test('Verifica se as informações detalhadas do Pokémon'
  + 'selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const moreDetailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);
    const pokemonDetailsHeading = screen.getByRole('heading', {
      level: 2,
      name: `${name} Details`,
    });
    expect(pokemonDetailsHeading).toBeInTheDocument();

    expect(moreDetailsButton).not.toBeInTheDocument();

    const summaryHeader = screen.getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });
    expect(summaryHeader).toBeInTheDocument();

    const summaryText = screen.getByText(`${summary}`);
    expect(summaryText).toBeInTheDocument();
  });

  test('Verifique se existe uma seção com os mapas contendo'
  + 'as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const moreDetailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);

    const gameLocationsHeading = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${name}`,
    });
    expect(gameLocationsHeading).toBeInTheDocument();

    const locations = screen.getAllByRole('img');
    foundAt.forEach((loc, index) => {
      expect(locations[index + 1]).toHaveAttribute('src', loc.map);
      expect(locations[index + 1]).toHaveAttribute('alt', `${name} location`);
      const mapName = screen.getByText(loc.location);
      expect(mapName).toBeInTheDocument();
    });
  });

  test('Verifique se se o usuário pode favoritar um pokémon'
  + 'através da página de detalhes', () => {
    renderWithRouter(<App />);

    let moreDetailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);

    let favoriteCheckbox = screen.getByRole('checkbox');
    userEvent.click(favoriteCheckbox);
    const favoritePokemonLabel = screen.getByText(/Pokémon favoritado?/i);
    expect(favoritePokemonLabel).toBeInTheDocument();

    let favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteLink);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(name);

    moreDetailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);

    favoriteCheckbox = screen.getByRole('checkbox');
    userEvent.click(favoriteCheckbox);

    favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteLink);

    const noFavoriteText = screen.getByText('No favorite pokemon found');
    expect(noFavoriteText).toBeInTheDocument();
  });
});
