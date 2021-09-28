// Ajuda do Rod monstrão <3
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste o componente App.js', () => {
  test('link com texto "Home" e se o click leva a URL "/"', () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const link = screen.getByRole('link', { name: 'Home' });
    expect(link).toBeInTheDocument();

    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('link com texto "About" e se o click leva a URL "/about"', () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const link = screen.getByRole('link', { name: 'About' });
    expect(link).toBeInTheDocument();

    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('link com texto "Favorite Pokémons" e se o click leva a URL "/favorites"', () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const link = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(link).toBeInTheDocument();

    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('redireciona para a página Not Found ao entrar em uma URL desconhecida', () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    history.push('/not-found');
    const notFound = screen.getByText(/not Found/i);
    expect(notFound).toBeInTheDocument();
  });
});
