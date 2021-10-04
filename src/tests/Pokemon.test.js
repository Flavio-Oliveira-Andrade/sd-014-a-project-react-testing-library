import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Teste da Pokemon Card', () => {
  test('Verifica as informações do Pokemon', () => {
    render(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />, { wrapper: BrowserRouter });

    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const img = screen.getByRole('img', { name: /pikachu sprite/i });
    const url = pokemons[0].image;
    const { value } = pokemons[0].averageWeight;
    const { measurementUnit } = pokemons[0].averageWeight;

    expect(name).toHaveTextContent('Pikachu');
    expect(type).toHaveTextContent('Electric');
    expect(weight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', url);
  });
  test('Verifica se existe o link More Details', () => {
    render(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />, { wrapper: BrowserRouter });

    const link = screen.getByRole('link', { name: /more details/i });

    expect(link).toBeInTheDocument();
  });
  test('Verifica o redirecionamento do link MoreDetails', () => {
    const isFavorite = true;
    render(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ isFavorite }
    />, { wrapper: BrowserRouter });

    const { id } = pokemons[0];
    const link = screen.getByRole('link', { name: /more details/i });

    expect(link).toBeInTheDocument();

    userEvent.click(link);

    expect(window.location.pathname).toStrictEqual(`/pokemons/${id}`);
  });
  test('Verifica a img de Favorito', () => {
    const isFavorite = true;
    render(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ isFavorite }
    />, { wrapper: BrowserRouter });

    const img = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    const url = '/star-icon.svg';

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', url);
  });
});
