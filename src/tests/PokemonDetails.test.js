import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Testa componente PokemonDetails.js', () => {
  test('Testa se as informações detalhadas do Pokémon selecionado são exibidas', () => {
    renderWithRouter(<App />);

    const moreDetailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);

    const pokemonDetailsHeading = screen.getByRole('heading', {
      level: 2,
      name: /pikachu details/i,
    });
    expect(pokemonDetailsHeading).toBeInTheDocument();
    expect(moreDetailsButton).not.toBeInTheDocument();

    const summaryHeading = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(summaryHeading).toBeInTheDocument();

    const summaryText = screen.getByText('This intelligent Pokémon roasts hard berries'
    + ' with electricity to make them tender enough to eat.');
    expect(summaryText).toBeInTheDocument();
  });

  test('Testa se existe mapas com as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const moreDetailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);

    const pokemonLocationsHeading = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    expect(pokemonLocationsHeading).toBeInTheDocument();

    const firstPokemonLocationText = screen.getByText('Kanto Viridian Forest');
    expect(firstPokemonLocationText).toBeInTheDocument();

    const secondPokemonLocationText = screen.getByText('Kanto Power Plant');
    expect(secondPokemonLocationText).toBeInTheDocument();

    const pokemonLocationsImages = screen.getAllByAltText('Pikachu location');
    expect(pokemonLocationsImages[0]).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pokemonLocationsImages[1]).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('Testa se o usuário pode favoritar pokémon a partir da página de detalhes', () => {
    renderWithRouter(<App />);

    const moreDetailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);

    const favPokemonCheckbox = screen.getByLabelText('Pokémon favoritado?');
    expect(favPokemonCheckbox).toBeInTheDocument();
    userEvent.click(favPokemonCheckbox);

    const favoritePokemonsLink = screen.getByRole('link', {
      name: /favorite pokémons/i });
    userEvent.click(favoritePokemonsLink);
    const favPokemon = screen.getByText('Pikachu');
    expect(favPokemon).toBeInTheDocument();

    const moreDetailsButton2 = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton2);

    const favPokemonCheckbox2 = screen.getByRole('checkbox');
    userEvent.click(favPokemonCheckbox2);
    expect(favPokemonCheckbox2).not.toBeChecked();

    userEvent.click(favoritePokemonsLink);

    const noFavoritePokemonsText = screen.getByText('No favorite pokemon found');
    expect(noFavoritePokemonsText).toBeInTheDocument();
  });
});
