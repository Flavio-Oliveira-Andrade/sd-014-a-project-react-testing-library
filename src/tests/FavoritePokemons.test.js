import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './utils/renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Testa o componente FavoritePokemons', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);

    const favoriteNotFound = screen.getByText(/No favorite pokemon found/i);
    expect(favoriteNotFound).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);

    const pokemonType = screen.getByText('Dragon');
    userEvent.click(pokemonType);

    const getMoreDetails = screen.getByText('More details');
    userEvent.click(getMoreDetails);

    expect(history.location.pathname).toBe('/pokemons/148');

    const selectPokemon = screen.getByLabelText(/pokémon favoritado?/i);
    userEvent.click(selectPokemon);
    expect(selectPokemon).toBeChecked();

    const getFavoriteLink = screen.getByText(/favorite pokémons/i);
    userEvent.click(getFavoriteLink);
    expect(history.location.pathname).toBe('/favorites');

    const favorites = screen.getAllByText(/average weight/i);
    expect(favorites).toHaveLength(1);
  });
});
