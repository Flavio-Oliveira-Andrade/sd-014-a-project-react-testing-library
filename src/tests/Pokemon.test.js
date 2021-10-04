import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RenderWithRouter from './Util/RenderWithRouter';
import data from '../data';
import App from '../App';

describe('Verifica o componente Pokemon.js', () => {
  it('Verifca se o nome, tipo, peso médio e imagem do pokemon é mostrado na tela', () => {
    RenderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name').innerHTML;
    const pokemonType = screen.getByTestId('pokemon-type').innerHTML;
    const pokemonWeight = screen.getByTestId('pokemon-weight').innerHTML;
    const pokemonImg = screen.getByRole('img', { name: `${data[0].name} sprite` });

    expect(pokemonName).toBe('Pikachu');
    expect(pokemonType).toBe('Electric');
    expect(pokemonWeight).toBe('Average weight: 6.0 kg');
    expect(pokemonImg).toHaveAttribute('src', data[0].image);
  });
  it('Verifica link e redirecionamento de "More Info"', () => {
    RenderWithRouter(<App />);

    const moreInfoLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(moreInfoLink).toBeInTheDocument();

    userEvent.click(moreInfoLink);
    expect(moreInfoLink.href).toEqual('http://localhost/pokemons/25');
  });
  it('Verifica se ícone de favoritos é uma estrela', () => {
    RenderWithRouter(<App />);

    const moreInfoLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreInfoLink);

    const addFavorite = screen.getByRole('checkbox');

    userEvent.click(addFavorite);

    const favoritesPokemons = screen.getByAltText('Pikachu is marked as favorite');
    const starImg = '/star-icon.svg';
    expect(favoritesPokemons).toHaveAttribute('src', starImg);
  });
});
