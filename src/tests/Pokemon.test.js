import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

const pokemonTest = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: `This intelligent Pokémon roasts hard berrie
   with electricity to make them tender enough to eat.`,
};

const moreDetails = 'More details';

describe('Testando Pokemon.js', () => {
  test('Verifca se é renderizado um card com as '
    + 'informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonTest } isFavorite />);
    const averageWeight = `Average weight: ${pokemonTest
      .averageWeight.value} ${pokemonTest.averageWeight.measurementUnit}`;

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(pokemonTest.name);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(pokemonTest.type);

    const weightPokemon = screen.getByTestId('pokemon-weight');
    expect(weightPokemon).toBeInTheDocument();
    expect(weightPokemon).toHaveTextContent(averageWeight);

    const pokemonImage = screen.getByRole('img', {
      name: /sprite/i,
    });
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute('src', pokemonTest.image);
    expect(pokemonImage).toHaveAttribute('alt', `${pokemonTest.name} sprite`);
  });
  test('Verifica se o card do Pokémon contém um link para exibir mais detalhes', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonTest } isFavorite />);
    const moreDetailsLink = screen.getByRole('link', {
      name: moreDetails,
    });
    expect(moreDetailsLink).toBeInTheDocument();
    expect(moreDetailsLink).toHaveAttribute('href', `/pokemons/${pokemonTest.id}`);
  });
  test('Verifica se ao clicar no link mais detalhes, '
    + 'redireciona para a página de detalhes do Pokémon', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', {
      name: moreDetails,
    });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);
    const summary = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    expect(summary).toBeInTheDocument();
  });
  test('Verifica se a URL muda para /pokemons/id', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemonTest } isFavorite />);
    const moreDetailsLink = screen.getByRole('link', {
      name: moreDetails,
    });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemonTest.id}`);
  });
  test('Verifica se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', {
      name: moreDetails,
    });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);
    const favoriteCheckbox = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    expect(favoriteCheckbox).toBeInTheDocument();
    userEvent.click(favoriteCheckbox);
    const favoriteImg = screen.getByAltText(/as favorite/i);
    expect(favoriteImg).toBeInTheDocument();
    expect(favoriteImg).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteImg).toHaveAttribute('alt',
      `${pokemonTest.name} is marked as favorite`);
  });
});
