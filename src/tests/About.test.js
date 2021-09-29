import React from 'react';
import renderWithRouter from './utils/renderWithRouter';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App.js test', () => {
  test('Testa se os componentes possuem os links Home, About e Favorite Pokemons', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: /Home/i,
    });
    const aboutLink = screen.getByRole('link', {
      name: /About/i,
    });
    const favoriteLink = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });
});
