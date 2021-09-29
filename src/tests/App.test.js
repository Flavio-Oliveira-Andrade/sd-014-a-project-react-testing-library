import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste se o topo da aplicação'
  + ' contém um conjunto fixo de links de navegação.', () => {
  it('Verifica texto dos links', () => {
    render(<App />, { wrapper: MemoryRouter });
    const home = screen.getByRole('link', { name: /home/i });
    const about = screen.getByRole('link', { name: /about/i });
    const favorites = screen.getByRole('link', { name: /favorite/i });
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorites).toBeInTheDocument();
  });

  it('Verifica se ao clickar nos links,'
    + ' ocorre o roteamento para a página correta', () => {
    render(<App />, { wrapper: MemoryRouter });
    // Home routing test.
    const home = screen.getByRole('link', { name: /home/i });
    userEvent.click(home);
    const titleHome = screen.getByRole('heading', { name: /pokédex/i });
    expect(titleHome).toBeInTheDocument();
    // About routing test.
    const about = screen.getByRole('link', { name: /about/i });
    userEvent.click(about);
    const titleAbout = screen.getByRole('heading', { level: 2,
      name: /about pokédex/i,
    });
    expect(titleAbout).toBeInTheDocument();
    // Favorite routing test.
    const favorites = screen.getByRole('link', { name: /favorite/i });
    userEvent.click(favorites);
    const titleFavorites = screen.getByRole('heading', { name: /Favorite pokémons/i });
    expect(titleFavorites).toBeInTheDocument();
  });
  it('Verifica se ao inserir um endereço invalido,'
  + ' ocorre o roteamento para a página correta', () => {
    const history = createMemoryHistory();
    history.push('/rotaNãoDeveSerEncontrada');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const notFoundMessage = screen.getByRole('heading', {
      name: /page requested not found /i,
    });
    expect(notFoundMessage).toBeInTheDocument();
  });
});
