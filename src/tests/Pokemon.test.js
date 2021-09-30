import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter.test';
import pokemons from '../data';

import App from '../App';

describe('06 - Teste o componente "Pokemon.js"', () => {
  const {
    id,
    name,
    type,
    averageWeight: {
      value, measurementUnit,
    },
    image,
  } = pokemons[0];

  test('se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const correctPokemonName = screen.getByTestId('pokemon-name');
    expect(correctPokemonName).toHaveTextContent(name);

    const correctPokemonType = screen.getByTestId('pokemon-type');
    expect(correctPokemonType).toHaveTextContent(type);

    const correctPokemonWeight = screen.getByTestId('pokemon-weight');
    expect(correctPokemonWeight).toHaveTextContent(
      `Average weight: ${value} ${measurementUnit}`,
    );

    expect(screen.getByAltText(`${name} sprite`)).toHaveAttribute('src', image);
  });

  test('se o card do Pokémon indicado na Pokédex contém link para detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(linkDetails).toBeDefined();
    userEvent.click(linkDetails);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  test('se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkDetails);

    const checkboxFav = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?', // RegEx reclamou
    });
    userEvent.click(checkboxFav);

    const starIcon = screen.getByRole('img', {
      name: `${name} is marked as favorite`,
    });
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
