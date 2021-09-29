import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação',
    () => {
      renderWithRouter(<App />);

      const homeLink = screen.getByRole('link', { name: 'Home' });
      expect(homeLink).toBeInTheDocument();

      const aboutLink = screen.getByRole('link', { name: 'About' });
      expect(aboutLink).toBeInTheDocument();

      const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
      expect(favoriteLink).toBeInTheDocument();
    });

  test('Ao clicar no link "Home", a aplicação e direcionada para a URL "/"',
    () => {
      const { history } = renderWithRouter(<App />);

      const homeLink = screen.getByRole('link', { name: 'Home' });
      userEvent.click(homeLink);

      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });

  test('Ao clicar no link "About", a aplicação e direcionada para a URL "/about"',
    () => {
      const { history } = renderWithRouter(<App />);

      const aboutLink = screen.getByRole('link', { name: 'About' });
      userEvent.click(aboutLink);

      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });

  test('Ao clicar no link "Favorite", a aplicação e direcionada para a URL "/favorites"',
    () => {
      const { history } = renderWithRouter(<App />);

      const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
      userEvent.click(favoriteLink);

      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });

  test('Ao entrar em URL desconhecida, a aplicação é redirecionada para Not Found',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/notfoud/test');
      const notFoundMessage = screen.getByText('Page requested not found');
      expect(notFoundMessage).toBeInTheDocument();
    });
});
