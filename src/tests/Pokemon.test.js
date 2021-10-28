import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import pokemons from '../data';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';

describe('6. Teste o componente <Pokemon.js />', () => {
  test('É renderizado um card com as informações do pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

    const { averageWeight: { measurementUnit, value }, image, name, type } = pokemons[0];

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(name);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(type);

    const pokemonWgt = screen.getByTestId('pokemon-weight');
    expect(pokemonWgt).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

    const pokemonImg = screen.getByRole('img');
    expect(pokemonImg).toHaveAttribute('src', image);
    expect(pokemonImg).toHaveAttribute('alt', `${name} sprite`);
    expect(pokemonImg).toBeInTheDocument();
  });

  test('O card do Pokémon contém link para exibir detalhes', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

    const link = screen.getByRole('link', { name: /More details/i });
    expect(link).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
    expect(link).toBeInTheDocument();
  });

  test('Ao clicar no link é redirecionado para a página de detalhes', () => {
    renderWithRouter(<App />);

    const link = screen.getByText(/More details/i);
    userEvent.click(link);

    const heading2 = screen.getByRole('heading', {
      name: new RegExp(`${pokemons[0].name} details`, 'i'),
      level: 2,
    });
    expect(heading2).toBeInTheDocument();
  });

  test('A URL muda para /pokemon/<id>', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

    const link = screen.getByText(/More details/i);
    userEvent.click(link);

    expect(window.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  test('Existe um ícone nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const fav = screen.getByRole('img', {
      name: `${pokemons[0].name} is marked as favorite`,
    });

    expect(fav).toHaveAttribute('src', '/star-icon.svg');
    expect(fav).toHaveAttribute('alt', `${pokemons[0].name} is marked as favorite`);
    expect(fav).toBeInTheDocument();
  });
});
