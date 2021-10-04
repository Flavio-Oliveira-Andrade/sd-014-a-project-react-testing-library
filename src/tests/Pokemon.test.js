import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import { Pokemon } from '../components';

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações'
  + 'de determinado pokémon.', () => {
    const { name, type, averageWeight, image } = pokemons[0];
    const { value, measurementUnit } = averageWeight;

    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const namePkemon = screen.getByTestId('pokemon-name');
    const typePokemon = screen.getByTestId('pokemon-type');
    const typeWeight = screen.getByTestId('pokemon-weight');
    const imagem = screen.getByRole('img', { name: `${name} sprite` });

    expect(namePkemon).toHaveTextContent(name);
    expect(typePokemon).toHaveTextContent(type);
    expect(typeWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(imagem).toHaveAttribute('src', image);
  });

  test('Link de navegação para Detalhes', () => {
    const { id } = pokemons[0];
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const details = screen.getByRole('link', { name: 'More details' });

    expect(details).toHaveAttribute('href', `/pokemons/${id}`);
    userEvent.click(details);
    const path = history.location.pathname;
    expect(path).toBe(`/pokemons/${id}`);
  });

  // Não esta passando - verificar
  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { name } = pokemons[0];
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const iconeStrela = screen.getByRole('img', { name: /favorite/i });

    expect(iconeStrela).toBeInTheDocument();
    expect(iconeStrela).toHaveAttribute('src', '/star-icon.svg');
    expect(iconeStrela).toHaveAttribute('alt', `${name} is marked as favorite`);
  });
});
