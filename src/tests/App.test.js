import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
//

describe('1. Teste o componente <App >', () => {
  afterEach(() => {
    cleanup();
  });

  it('1.1. se o topo da aplicação contém um'
  + 'conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favoriteLink).toBeInTheDocument();
  });

  it('1.2. se a aplicação é redirecionada para a página'
   + 'inicial, na URL / ao clicar no link Home'
   + 'da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });

    userEvent.click(homeLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('1.3. se a aplicação é redirecionada para a página de About,'
  + 'na URL /about, ao clicar no link'
  + 'About da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });

    userEvent.click(aboutLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  it('1.4. se a aplicação é redirecionada para a página de Pokémons'
  + 'Favoritados, na URL /favorites, ao clicar no link Favorite'
  + 'Pokémons da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  it('1.5. se a aplicação é redirecionada para a página Not Found'
  + 'ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('unknown');

    const heading = screen.getByRole('heading', { level: 2 });
    const { location: { pathname } } = history;
    expect(pathname).toBe('/unknown');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/[page request not found]/i);
  });
});
