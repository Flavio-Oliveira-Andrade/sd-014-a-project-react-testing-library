import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter/renderWithRouter';
import App from '../App';

describe('testa o componente Pokemon: ', () => {
  it('testa se é exibido o nome, tipo, imagem e peso do pikachu', () => {
    renderWithRouter(<App />);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe('Electric');

    const img = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const pikachuImg = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pikachuImg).toHaveAttribute('src', img);
    expect(pikachuImg).toHaveAttribute('alt', 'Pikachu sprite');

    const weight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(weight).toBeInTheDocument();
  });

  it('testa o link "More details"', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
  });

  it('Mostra uma estrela ao exibir um pokemon favoritado', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const favoritePokemon = screen.getByText(/pokémon favoritado?/i);
    userEvent.click(favoritePokemon);

    const favorite = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });

    expect(favorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
