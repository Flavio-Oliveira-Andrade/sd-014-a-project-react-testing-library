import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  test('Se o link "Home" aparece na tela ao renderizar o componente'
    + 'e se redireciona para o caminho certo "/"', () => {
    const { history } = renderWithRouter(<App />);
    const navHomeLink = screen.getByRole('link', {
      name: /home/i,
    });
    expect(navHomeLink).toBeInTheDocument();

    userEvent.click(navHomeLink);
    expect(history.location.pathname).toBe('/');
  });

  test('Se o link "About" aparece na tela ao renderizar o componente'
    + 'e se redireciona para o caminho certo "/about"', () => {
    const { history } = renderWithRouter(<App />);
    const navAboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    expect(navAboutLink).toBeInTheDocument();

    userEvent.click(navAboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  test('Se o link "Favorite Pokémons" aparece na tela ao renderizar o componente'
    + 'e se redireciona para o caminho certo "/about"', () => {
    const { history } = renderWithRouter(<App />);
    const navFavoriteLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(navFavoriteLink).toBeInTheDocument();

    userEvent.click(navFavoriteLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Se a aplicação é redirecionada para a página "Not Found"', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/nao-existe');
    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
