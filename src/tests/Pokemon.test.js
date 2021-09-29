import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import RenderWithRouter from '../RenderWithRouter';

describe('Verifica se é renderizado o card do Pokemon', () => {
  test('Primeiro link deve possuir texto Home', () => {
    RenderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

    const namePoke = screen.getByTestId('pokemon-name');
    expect(namePoke).toHaveTextContent('Pikachu');

    const typePoke = screen.getByTestId('pokemon-type');
    expect(typePoke).toHaveTextContent('Electric');

    const weightPoke = screen.getByTestId('pokemon-weight');
    expect(weightPoke).toHaveTextContent('Average weight: 6.0 kg');

    const image = screen.getByAltText('Pikachu sprite');
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image).toBeInTheDocument();
  });

  test('Verifica se o Link vai para os detalhes do Pokemon', () => {
    RenderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

    const aboutLink = screen.getByText(/More Details/i);
    expect(aboutLink.href).toContain('pokemons/25');
  });

  test('Verifica se redireciona a pagina ao clicar no link', () => {
    const { history } = RenderWithRouter(<Pokemon
      pokemon={ pokemons[2] }
      isFavorite={ false }
    />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const buttonDetails = screen.getByText('More details');

    expect(pokemonName).toHaveTextContent('Caterpie');
    userEvent.click(buttonDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/10');
  });

  test('Verifica se mostra a estrela no favorito', () => {
    RenderWithRouter(<Pokemon
      pokemon={ pokemons[4] }
      isFavorite
    />);
    const icon = screen.getByAltText(/is marked as favorite/i);
    expect(icon.src).toBe('http://localhost/star-icon.svg');
    expect(icon.alt).toBe('Alakazam is marked as favorite');
  });
});
