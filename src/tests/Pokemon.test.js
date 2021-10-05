import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Util/RenderWithRouter';
import App from '../App';

describe('Testes do componente Pokemon', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const pikachu = 25;
    const pikachuFavorite = [pikachu];
    const pikachuJson = JSON.stringify(pikachuFavorite);
    localStorage.setItem('favoritePokemonIds', pikachuJson);

    render(<MemoryRouter><App /></MemoryRouter>);

    const pokemonName = screen.getByTestId('pokemon-name');
    const name = pokemonName.textContent;
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByRole('img', {
      name: `${name} sprite`,
    });
    const detailLink = screen.getByRole('link', {
      name: 'More details',
    });
    const isFavoriteImage = screen.getByRole('img', {
      name: `${name} is marked as favorite`,
    });

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType.innerHTML).toBe('Electric');
    expect(pokemonWeight).toBeInTheDocument();
    expect(detailLink).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(isFavoriteImage).toHaveAttribute('src', '/star-icon.svg');
  });

  test('Se o link de informações detalhadas funciona corretamente', () => {
    const { customHistory } = renderWithRouter(<App />);

    const moreDetailsBtn = screen.getByRole('link', {
      name: 'More details',
    });

    userEvent.click(moreDetailsBtn);

    const { pathname } = customHistory.location;
    expect(pathname).toBe('/pokemons/25');
  });
});
