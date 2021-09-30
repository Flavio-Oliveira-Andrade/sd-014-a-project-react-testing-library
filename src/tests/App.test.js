import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../utils/RenderWithRoute';

describe('App.js test', () => {
  test('Testa se o topo da aplicação contém um conjunto de links de navegação', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const homeLink = screen.getByRole('link', {
      name: /Home/i,
    });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', {
      name: /About/i,
    });
    expect(aboutLink).toBeInTheDocument();

    const favoriteLink = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(favoriteLink).toBeInTheDocument();
  });
});

describe('Testa rotas Home, About, Favorites e Not Found', () => {
  test('testando rota Home', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });

  test('testando rota About', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  test('testando rota favorites', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorites = screen.getByRole('link', {
      name: /favorite/i,
    });
    userEvent.click(linkFavorites);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('testando rota não encontrada', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-que-nao-existe');
    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(notFound).toBeInTheDocument();
  });
});
