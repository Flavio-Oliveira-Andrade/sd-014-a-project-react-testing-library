import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import App from '../App';

import renderWithRouter from './renderWithRouter';

describe('7- Teste do componente PokemonDetails', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/25');
  });

  test('7.1 - Testa se as informações do Pokémon selecionado são mostradas', () => {
    const header = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    const summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    const pokemonDetails = screen.getByText(
      'This intelligent Pokémon roasts hard berries with electricity to make'
        + ' them tender enough to eat.',
    );
    const link = screen.queryByText('More details');

    expect(header).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(pokemonDetails).toBeInTheDocument();
    expect(link).not.toBeInTheDocument();
  });

  test('7.2 Se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const locationsHeader = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });

    const locations = [
      screen.getByText('Kanto Viridian Forest'),
      screen.getByText('Kanto Power Plant'),
    ];

    const locationImages = screen.getAllByAltText('Pikachu location');
    const expectedImages = [
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    ];

    expect(locationsHeader).toBeInTheDocument();

    locations.forEach((location) => {
      expect(location).toBeInTheDocument();
    });

    locationImages.forEach((image, index) => {
      expect(image.src).toBe(expectedImages[index]);
    });
  });

  test('7.3 se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const favoritePokemon = screen.getByRole('checkbox');
    const favoriteLabel = screen.getByLabelText('Pokémon favoritado?');

    expect(favoriteLabel).toBeInTheDocument();

    fireEvent.click(favoritePokemon);

    const star = screen.getByAltText('Pikachu is marked as favorite');

    expect(star).toBeInTheDocument();

    fireEvent.click(favoritePokemon);

    expect(star).not.toBeInTheDocument();
  });
});
