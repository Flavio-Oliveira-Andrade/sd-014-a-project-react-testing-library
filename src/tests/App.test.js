import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../rendreWithRouter';
import App from '../App';

describe('Testa o componente App.js', () => {
  it('o primeiro link deve possuir o texto "Home"', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /Home/i });
    expect(linkHome).toBeInTheDocument();
  });

  it('o segundo link deve possuir o texto "About"', () => {
    renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /About/i });
    expect(linkAbout).toBeInTheDocument();
  });

  it('o terceiro link deve possuir o texto "Favorite Pokémons"', () => {
    renderWithRouter(<App />);

    const linkFavoritePokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkFavoritePokemons).toBeInTheDocument();
  });
});
