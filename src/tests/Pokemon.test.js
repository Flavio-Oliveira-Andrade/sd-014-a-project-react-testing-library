import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

describe('Teste o componente "Pokemon', () => {
  test('Verifica se é renderizado um card com as informações do pokémon', () => {
    renderWithRouter(<App />);

    const pikachu = pokemons[0];
    const pikachuWeight = pikachu.averageWeight;
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByRole('img');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(pikachu.name);
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(pikachu.type);
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight).toHaveTextContent(
      `Average weight: ${pikachuWeight.value} ${pikachuWeight.measurementUnit}`,
    );
    expect(pokemonImage).toHaveAttribute('src', pikachu.image);
    expect(pokemonImage).toHaveAttribute('alt', `${pikachu.name} sprite`);
  });

  test('Verificar se o card do Pokémon indicado na Pokédex contém'
  + 'um link de navegação para exibir detalhes deste Pokémon', () => {
    renderWithRouter(<App />);

    const moreDetailsButton = screen.getByRole('link', { name: /more details/i });

    expect(moreDetailsButton).toBeInTheDocument();
    expect(moreDetailsButton).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
  });

  test('Verifica se ao clicar no link de navegação do Pokémon, é feito o redirecionamento'
  + 'da aplicação para a página de detalhes de Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);

    const summaryHeader = screen.getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });
    expect(summaryHeader).toBeInTheDocument();

    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  test('Verifica se xiste um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);

    const favoriteCheckbox = screen.getByRole('checkbox');
    userEvent.click(favoriteCheckbox);

    const favoriteIcon = screen.getAllByRole('img');
    expect(favoriteIcon[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteIcon[1]).toHaveAttribute(
      'alt',
      `${pokemons[0].name} is marked as favorite`,
    );
  });
});
