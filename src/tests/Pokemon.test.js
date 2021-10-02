import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

describe('Testa se o componente Pokemon.js: ', () => {
  it('Mostra corretamente nome, peso e imagem do pokemon', () => {
    renderWithRouter(<App />);

    const urlImg = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const pokemonName = screen.getByText(/pikachu/i);
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByText(/average weight: 6\.0 kg/i);
    const pokemonImg = screen.getByRole('img', { name: /pikachu sprite/i });

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType.innerHTML).toBe('Electric');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonImg).toHaveAttribute('src', urlImg);
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it('Mostra um link com texto "More details" e se ele funciona', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', '/pokemons/25');

    userEvent.click(detailsLink);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Mostra uma estrela ao exibir um pokemon favoritado', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const favoritePokemon = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(favoritePokemon);

    const favoriteStar = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });

    expect(favoriteStar).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    expect(favoriteStar).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteStar).toBeInTheDocument();
  });
});
