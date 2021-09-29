import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('1. Testa o componente App.js', () => {
  test('Testa se a aplicação contém um conjunto de links', () => {
    render(<MemoryRouter><App /></MemoryRouter>);

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    expect(aboutLink).toBeInTheDocument();

    const favoriteLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(favoriteLink).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para Home, ao clicar no link', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  test('Teste se a aplicação é redirecionada para About, ao clicar no link', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  test('Teste se a aplicação é redirecionada para'
  + ' Pokemons Favoritados, ao clicar no link', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(favoriteLink).toBeInTheDocument();

    userEvent.click(favoriteLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Teste se a aplicação é redirecionada para'
  + ' Not Found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/rota-que-nao-existe');

    expect(history.location.pathname).toBe('/rota-que-nao-existe');
  });
});
