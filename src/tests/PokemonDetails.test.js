import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './utils/renderWithRouter';
import { PokemonDetails } from '../components';
import pokemons from '../data';
import App from '../App';

describe('7. Testa o Componente PokemonDetails.js', () => {
  test('Testa as informações detalhadas do Pokémon selecionado', () => {
    renderWithRouter(<PokemonDetails
      pokemons={ pokemons }
      isPokemonFavoriteById={ { 25: true } }
      match={ { params: { id: '25' } } }
    />);

    const text = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(text).toBeInTheDocument();

    const summaryTitle = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(summaryTitle).toBeInTheDocument();

    const summaryParagraph = screen.getByText(pokemons[0].summary);
    expect(summaryParagraph).toBeInTheDocument();
  });

  test('Teste se existe na página uma seção'
  + ' com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<PokemonDetails
      pokemons={ pokemons }
      isPokemonFavoriteById={ { 25: true } }
      match={ { params: { id: '25' } } }
    />);

    const locationsTitle = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    expect(locationsTitle).toBeInTheDocument();

    const imgsLocation = screen.getAllByRole('img');
    expect(imgsLocation[2]).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgsLocation[2]).toHaveAttribute('alt', 'Pikachu location');

    expect(imgsLocation[3]).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(imgsLocation[3]).toHaveAttribute('alt', 'Pikachu location');
  });
  test('Teste se o usuário pode favoritar'
   + 'um pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const pokemonType = screen.getByText('Dragon');
    userEvent.click(pokemonType);

    const getMoreDetails = screen.getByText('More details');
    userEvent.click(getMoreDetails);

    expect(history.location.pathname).toBe('/pokemons/148');

    const selectPokemon = screen.getByLabelText(/pokémon favoritado?/i);
    userEvent.click(selectPokemon);
    expect(selectPokemon).toBeChecked();
    userEvent.click(selectPokemon);
    expect(selectPokemon).not.toBeChecked();
  });
});
