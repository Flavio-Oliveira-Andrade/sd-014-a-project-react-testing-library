// test('', () => {});
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';

import App from '../App';
import { Pokemon } from '../components';
import pokemons from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const name = screen.getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent(`${pokemons[0].name}`);

    const type = screen.getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();
    expect(type).toHaveTextContent(`${pokemons[0].type}`);

    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toBeInTheDocument();
    expect(weight).toHaveTextContent(`Average weight: ${pokemons[0].averageWeight.value}`
    + ` ${pokemons[0].averageWeight.measurementUnit}`);

    const img = screen.getByAltText(/pikachu sprite/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', `${pokemons[0].image}`);
    expect(img).toHaveAttribute('alt', `${pokemons[0].name} sprite`);
  });

  test('Teste se existe na página uma seção com'
  + 'os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByText(/more details/i);
    fireEvent.click(moreDetails);
    expect(screen.getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
  });

  test('Teste se o usuário pode favoritar um pokémon na página de detalhes', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(moreDetails);

    const favorites = screen.getByLabelText(/pokémon favoritado/i);
    fireEvent.click(favorites);

    const favImg = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(favImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
