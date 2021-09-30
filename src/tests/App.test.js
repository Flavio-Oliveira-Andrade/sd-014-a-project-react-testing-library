import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('Testa o App.js', () => {
  test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação',
    () => {
      render(<App />, { wrapper: BrowserRouter });

      const homeLink = screen.getByRole('link', { name: /home/i });
      const aboutLink = screen.getByRole('link', { name: /about/i });
      const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });

      expect(homeLink).toBeInTheDocument();
      expect(aboutLink).toBeInTheDocument();
      expect(favoriteLink).toBeInTheDocument();
    });
  test('Testa se a aplicação é redirecionada para o inicio ao clicar em home', () => {
    render(<App />, { wrapper: BrowserRouter });

    const link = screen.getByRole('link', { name: /home/i });
    const header = screen
      .getByRole('heading', { name: /Encountered pokémons/i, level: 2 });

    userEvent.click(link);

    expect(window.location.pathname).toStrictEqual('/');
    expect(header).toBeInTheDocument();
  });

  test('Testa se a aplicação é redirecionada para o sobre ao clicar em about', () => {
    render(<App />, { wrapper: BrowserRouter });

    const link = screen.getByRole('link', { name: /about/i });

    userEvent.click(link);

    const header = screen
      .getByRole('heading', { name: /about pokédex/i, level: 2 });

    expect(window.location.pathname).toStrictEqual('/about');
    expect(header).toBeInTheDocument();
  });
  test('Testa se a aplicação é redirecionada para os favoritos ao clicar em favorite',
    () => {
      render(<App />, { wrapper: BrowserRouter });

      const link = screen.getByRole('link', { name: /favorite pokémons/i });

      userEvent.click(link);

      const header = screen
        .getByRole('heading', { name: /favorite pokémons/i, level: 2 });

      expect(window.location.pathname).toStrictEqual('/favorites');
      expect(header).toBeInTheDocument();
    });
  test('Testa se é redirecionada para página Not Found com URL desconhecida', () => {
    window.history.pushState({}, 'Test page', '/pagina-qualquer');

    render(<App />, { wrapper: BrowserRouter });

    const header = screen.getByRole('heading', { name: /not found/i, level: 2 });

    expect(window.location.pathname).toStrictEqual('/pagina-qualquer');
    expect(header).toBeInTheDocument();
  });
});
