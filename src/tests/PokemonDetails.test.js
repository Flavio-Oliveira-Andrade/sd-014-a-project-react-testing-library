import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import { pokemons, isPokemonFavoriteById } from './mocks/pokeMocks';

import PokemonDetails from '../components/PokemonDetails';

describe('Página PokemonDetails', () => {
  const mockOnUpdateFavoritePokemons = jest.fn();

  test('renderiza detalhes sobre um Pokémon', () => {
    const { id, name, summary } = pokemons[0];
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ isPokemonFavoriteById }
        match={ { params: { id: String(id) } } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ mockOnUpdateFavoritePokemons }
      />,
    );

    const detailsLink = screen.queryByRole('link', { name: /details/i });
    expect(detailsLink).not.toBeInTheDocument();

    const title = screen.getByRole('heading',
      { level: 2, name: `${name} Details` });
    expect(title).toBeInTheDocument();

    const subtitle = screen.getByRole('heading',
      { level: 2, name: 'Summary' });
    expect(subtitle).toBeInTheDocument();

    const summaryElement = screen.getByText(summary, { selector: 'p' });
    expect(summaryElement).toBeInTheDocument();
  });

  test('renderiza seção de mapas com localizações do Pokémon', () => {
    const { id, name, foundAt } = pokemons[0];
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ isPokemonFavoriteById }
        match={ { params: { id: String(id) } } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ mockOnUpdateFavoritePokemons }
      />,
    );

    const mapTitle = screen.getByRole('heading',
      { level: 2, name: `Game Locations of ${name}` });
    expect(mapTitle).toBeInTheDocument();

    const locationNames = screen.getAllByText(/./i, { selector: 'em' });
    const locationImages = screen.getAllByRole('img',
      { name: `${name} location` });

    foundAt.forEach(({ location, map }, index) => {
      expect(locationNames[index]).toBeInTheDocument();
      expect(locationNames[index].innerHTML).toBe(location);

      expect(locationImages[index]).toBeInTheDocument();
      expect(locationImages[index].src).toBe(map);
    });
  });
  test('renderiza checkkbox para favoritar um pokémon', () => {
    const { id } = pokemons[0];
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ isPokemonFavoriteById }
        match={ { params: { id: String(id) } } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ mockOnUpdateFavoritePokemons }
      />,
    );

    const checkbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(checkbox).toBeInTheDocument();

  userEvent.click(checkbox);
  expect(mockOnUpdateFavoritePokemons).toHaveBeenCalledTimes(1);
  expect(mockOnUpdateFavoritePokemons).toHaveBeenCalledWith(id, false);
  });
});
