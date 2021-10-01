import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

describe('Testa o componente Favorite Pokemons', () => {
  test('Testa se é exibido na tela a mensagem'
  + 'No favorite pokemon found, se a pessoa não tiver pokémons favoritos', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const favoriteClick = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    localStorage.setItem('favoritePokemonsIds', []);
    userEvent.click(favoriteClick);
    const noFavoriteText = screen.getByText(/no favorite pokemon found/i);
    expect(noFavoriteText).toBeInTheDocument();
  });

  test('Testa se a lista de favoritos renderiza', () => {
    const pikachuId = 25;
    const charmanderId = 4;
    const caterpieId = 10;
    const idArray = [charmanderId, pikachuId, caterpieId];
    const pokemonIdJson = JSON.stringify(idArray);
    localStorage.setItem('favoritePokemonIds', pokemonIdJson);
    render(<MemoryRouter><App /></MemoryRouter>);

    const favoriteClick = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });

    userEvent.click(favoriteClick);
    const pikachu = screen.getByText('Pikachu');
    const charmander = screen.getByText('Charmander');
    const caterpie = screen.getByText('Caterpie');
    expect(pikachu).toBeInTheDocument();
    expect(charmander).toBeInTheDocument();
    expect(caterpie).toBeInTheDocument();
  });
});
