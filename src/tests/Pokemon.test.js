import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import { Pokemon } from '../components';
import pokemons from '../data';

describe('Testa o componente Pokemon', () => {
  test('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe('Pikachu');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe('Electric');

    const pokemonWeigth = screen.getByTestId('pokemon-weight');
    expect(pokemonWeigth.innerHTML).toBe('Average weight: 6.0 kg');

    const imgPokedex = screen.getByRole('img');
    expect(imgPokedex).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imgPokedex).toHaveAttribute('alt', 'Pikachu sprite');
  });
  test('Teste se o card do Pokémon indicado'
   + ' na Pokédex contém um link de navegação para exibir detalhes do Pokémon.', () => {
    renderWithRouter(<App />);

    const detailsLinks = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(detailsLinks.href).toBe('http://localhost/pokemons/25');
  });
  test('Teste se ao clicar no link de navegação do Pokémon'
   + ' , é feito o redirecionamento', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLinks = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(detailsLinks.href).toBe('http://localhost/pokemons/25');

    userEvent.click(detailsLinks);

    expect(history.location.pathname).toBe('/pokemons/25');
  });
  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const imgPokedex = screen.getByRole('img', {
      name: 'Pikachu is marked as favorite',
    });
    expect(imgPokedex).toHaveAttribute('src',
      '/star-icon.svg');
    expect(imgPokedex).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
