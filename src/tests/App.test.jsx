import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('item 1', () => {
  it('o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const linkHome = screen.getByRole('link', { name: 'Home' });
    const linkAbout = screen.getByRole('link', { name: 'About' });
    const linkFavo = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavo).toBeInTheDocument();
  });

  it('redireciona para a página inicial ao clicar Home', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('redireciona para a página de About ao clicar na mesma', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  it('redireciona para a página de Pokémons Favoritados ao clicar na mesma', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const linkFavo = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavo);
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  it('redireciona para "Pag Not Found" quando estiver em uma URL desconhecida. ', () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    history.push('/not-found');
    const notPagFound = screen.getByText(/not found/i);

    expect(notPagFound).toBeInTheDocument();
  });
});
