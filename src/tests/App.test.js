import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Utilis/renderWithRouter';

import App from '../App';

describe('Teste a aplicação App', () => {
  test('Teste se o topo da aplicação contem um conjunto de links', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });

    const favoritesLink = screen.getByRole('link', {
      name: /favorite/i,
    });
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritesLink).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página inicial,'
  + ' na URL / ao clicar no link Home da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/');

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });

    userEvent.click(homeLink);

    const { pathname } = history.location;
    const titleHomePage = screen.getByText('Encountered pokémons');
    expect(pathname).toBe('/');
    expect(titleHomePage).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página de About,'
  + ' na URL /about, ao clicar no link About da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/about');

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });

    userEvent.click(aboutLink);

    const { pathname } = history.location;
    const titleAboutPage = screen.getByText('About Pokédex');
    expect(pathname).toBe('/about');
    expect(titleAboutPage).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para página de Pokémons Favoritados, na URL'
  + '/favorites, ao clicar no link Favorite Pokémons da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/favorites');

    const favoritesLink = screen.getByRole('link', {
      name: /favorite/i,
    });

    userEvent.click(favoritesLink);

    const { pathname } = history.location;
    const titleFavoritePage = screen.getByText('Favorite pokémons');
    expect(pathname).toBe('/favorites');
    expect(titleFavoritePage).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página'
  + ' Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/xablau');

    const didntFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(didntFound).toBeInTheDocument();
  });
});
