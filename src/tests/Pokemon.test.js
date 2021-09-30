import React from 'react';
import { fireEvent } from '@testing-library/react';
import pokemons from '../data';

import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';

const isFavorite = {
  0: true,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const { screen } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ isFavorite[pokemons[0].id] }
      />,
    );

    // O nome correto do Pokémon deve ser mostrado na tela;
    expect(screen.getByTestId('pokemon-name').innerHTML).toEqual(pokemons[0].name);
    expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();

    // O tipo correto do pokémon deve ser mostrado na tela.
    expect(screen.getByTestId('pokemon-type').innerHTML).toEqual(pokemons[0].type);
    expect(screen.getByTestId('pokemon-type')).toBeInTheDocument();

    // O peso médio do pokémon deve ser exibido
    const peso = screen.getByText(
      `Average weight: ${pokemons[0].averageWeight.value} kg`,
    );
    expect(peso).toBeInTheDocument();

    // A imagem do Pokémon deve ser exibida.
    const img = screen.getByRole('img', { name: `${pokemons[0].name} sprite` });
    expect(img.src).toBe(pokemons[0].image);
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link', () => {
    const { screen, history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ isFavorite[pokemons[0].id] }
      />,
    );

    const moreDetails = screen.getByText('More details');
    fireEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { screen } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ isFavorite[pokemons[0].id] }
      />,
    );

    const star = screen.getByRole('img', {
      name: `${pokemons[0].name} is marked as favorite` });
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
