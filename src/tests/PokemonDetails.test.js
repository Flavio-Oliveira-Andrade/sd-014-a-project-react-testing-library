import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando a página PokemonDetails', () => {
  beforeEach(() => renderWithRouter(<App />));
  test('Se as informações do Pokémon selecionado são renderizadas', () => {
    userEvent.click(screen.getByText(/More details/));
    const pikachuDetails = screen.getByText(/Pikachu Details/);
    expect(pikachuDetails).toBeInTheDocument();
    const moreDetailsText = screen.queryByText(/More details/);
    expect(moreDetailsText).toBeNull();
    const summaryHeading = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(summaryHeading).toBeInTheDocument();
    const summaryText = screen.getByText(/This intelligent Pokémon roasts hard berries/);
    expect(summaryText).toBeInTheDocument();
  });

  test('Se a localização do Pokemon no mapa é renderizada', () => {
    userEvent.click(screen.getByText(/More details/));
    const pikachuLocationsHeading = screen
      .getByRole('heading', { name: 'Game Locations of Pikachu', level: 2 });
    expect(pikachuLocationsHeading).toBeInTheDocument();
    const pikachuLocationsImgs = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(pikachuLocationsImgs).toHaveLength(2);
    const viridianForestText = screen.getByText('Kanto Viridian Forest');
    expect(viridianForestText).toBeInTheDocument();
    const powerPlant = screen.getByText('Kanto Power Plant');
    expect(powerPlant).toBeInTheDocument();
    const pikachuLocations = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(pikachuLocations[0]).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pikachuLocations[1]).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Se há a possibilidade de favoritar o Pokemon.', () => {
    userEvent.click(screen.getByText(/More details/));
    const favoriteCheckbox = screen.getByRole('checkbox');
    expect(favoriteCheckbox).toBeInTheDocument();
    userEvent.click(favoriteCheckbox);
    const pokemonFavorited = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(pokemonFavorited).toBeInTheDocument();
    userEvent.click(favoriteCheckbox);
    const pikachuImgAltText = screen.queryByAltText(/pikachu is marked as favorite/i);
    expect(pikachuImgAltText).toBeNull();
    const pikachuFavoriteLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(pikachuFavoriteLabel).toBeInTheDocument();
  });
});
