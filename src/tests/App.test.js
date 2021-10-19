import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('Testa o componente App.js', () => {
  test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação',
    () => {
      render(<App />, { wrapper: BrowserRouter });
      // Sobre o uso do wrapper, consulta feita no link:
      // https://testing-library.com/docs/example-react-router/#reducing-boilerplate

      const homeText = screen.getByText(/home/i);
      expect(homeText).toBeInTheDocument();

      const aboutText = screen.getByText(/about/i);
      expect(aboutText).toBeInTheDocument();

      const favoriteText = screen.getByText(/favorite pokémons/i);
      expect(favoriteText).toBeInTheDocument();
    });

  test('Testa se ao clicar no link Home, redireciona para a página principal, na URL "/"',
    () => {
      render(<App />, { wrapper: BrowserRouter });
      const homeLink = screen.getByText(/home/i);
      const pageHome = screen.getByRole('heading', {
        level: 2,
        name: /encountered pokémons/i,
      });
      userEvent.click(homeLink);
      expect(window.location.pathname).toStrictEqual('/');
      expect(pageHome).toBeInTheDocument();
    });

  test('Testa se ao clicar no link About, redireciona para a página de About,'
  + 'na URL "/about"',
  () => {
    render(<App />, { wrapper: BrowserRouter });
    const aboutLink = screen.getByText(/about/i);
    userEvent.click(aboutLink);
    const pageAbout = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(window.location.pathname).toStrictEqual('/about');
    expect(pageAbout).toBeInTheDocument();
  });

  test('Testa se ao clicar no link Favorite Pokémons,'
  + 'redireciona para a página de Pokémons Favoritados, na URL "/favorites" ',
  () => {
    render(<App />, { wrapper: BrowserRouter });
    const favoritesLink = screen.getByText(/favorite pokémons/i);
    userEvent.click(favoritesLink);
    const pageFavorites = screen.getByRole('heading', {
      level: 2,
      name: /favorite pokémons/i,
    });
    expect(window.location.pathname).toStrictEqual('/favorites');
    expect(pageFavorites).toBeInTheDocument();
  });

  test('Testa se a aplicação é redirecionada para a página Not Found'
  + 'ao entrar em uma URL desconhecida',
  () => {
    window.history.pushState({}, 'Not found', '/not-found-page');
    render(<App />, { wrapper: BrowserRouter });
    const pageNotFound = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(pageNotFound).toBeInTheDocument();
  });
});
