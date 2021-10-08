import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './utils/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Requisito 6, testa o Pokemon.js', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(`${pokemons[0].name}`);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(`${pokemons[0].type}`);

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent(
      `Average weight: ${pokemons[0]
        .averageWeight.value} ${pokemons[0]
        .averageWeight.measurementUnit}`,
    );

    const pokemonImg = screen.getByRole('img', {
      name: /sprite/i,
    });

    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg.src).toContain(`${pokemons[0].image}`);
    expect(pokemonImg).toHaveAttribute('alt', `${pokemons[0].name} sprite`);
    expect(pokemonImg).toBeInTheDocument();
  });

  it('Testa se o card do Pokémon indicado na Pokédex contém um link'
    + 'de navegação para exibir detalhes deste Pokémon.', () => {
    renderWithRouter(<App />);
    const pokemonDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(pokemonDetails).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
  });

  it('Testa se ao clicar no link de navegação do Pokémon, é feito o'
    + 'redirecionamento da aplicação para a página de detalhes de Pokémon.', () => {
    const { history } = renderWithRouter(<App />);
    const detailsPage = screen.getByText(/more details/i);

    userEvent.click(detailsPage);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('Testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const detailsPage = screen.getByText(/more details/i);
    userEvent.click(detailsPage);

    const favoritePokemon = screen.getByRole('checkbox', {
      name: /pokémon favoritado/i,
    });
    userEvent.click(favoritePokemon);

    const favImg = screen.getByRole('img', {
      name: /marked as favorite/i,
    });
    expect(favImg).toBeInTheDocument();
    expect(favImg.src).toContain('/star-icon.svg');
  });
});
