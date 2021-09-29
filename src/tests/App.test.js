import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
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

  test('Testa redirecionamento para a URL "/"', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: /Home/i,
    });

    userEvent.click(homeLink);
    expect(history.entries[history.entries.length - 1].pathname).toBe('/');
  });

  test('Testa redirecionamento para a URL "/about"', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', {
      name: /About/i,
    });

    userEvent.click(aboutLink);
    expect(history.entries[history.entries.length - 1].pathname).toBe('/about');
  });

  test('Testa redirecionamento para a URL "/favorites"', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });

    userEvent.click(favoriteLink);
    expect(history.entries[history.entries.length - 1].pathname).toBe('/favorites');
  });

  test('Testa redirecionamento para página não encontrada', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/rota-inexistente');

    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(notFoundText).toBeInTheDocument();
  });
});
