import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import pokemons from '../data';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';

describe('6. Teste o componente <Pokemon.js />', () => {
  test('É renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

    const { averageWeight: { measurementUnit, value }, image, name, type } = pokemons[0];

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toHaveTextContent(name);

    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toHaveTextContent(type);

    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

    const pokeImage = screen.getByRole('img');
    expect(pokeImage).toHaveAttribute('src', image);
    expect(pokeImage).toHaveAttribute('alt', `${name} sprite`);
    expect(pokeImage).toBeInTheDocument();
  });

  test('O card do Pokémon indicado na Pokédex contém link para exibir detalhes', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

    const link = screen.getByRole('link', { name: /More details/i });
    expect(link).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
    expect(link).toBeInTheDocument();
  });

  test('Ao clicar no link, é feito o redirecionamento para a página de detalhes', () => {
    renderWithRouter(<App />);

    const link = screen.getByText(/More details/i);
    userEvent.click(link);

    const h2 = screen.getByRole('heading', {
      name: new RegExp(`${pokemons[0].name} details`, 'i'),
      level: 2,
    });
    expect(h2).toBeInTheDocument();
  });

  test('A URL exibida no navegador muda para /pokemon/<id>', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

    const link = screen.getByText(/More details/i);
    userEvent.click(link);

    expect(window.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  test('Existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const favorite = screen.getByRole('img', {
      name: `${pokemons[0].name} is marked as favorite`,
    });

    expect(favorite).toHaveAttribute('src', '/star-icon.svg');
    expect(favorite).toHaveAttribute('alt', `${pokemons[0].name} is marked as favorite`);
    expect(favorite).toBeInTheDocument();
  });
});
