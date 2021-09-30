import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './novoTeste/ renderWithRouter';
import App from '../App';

describe('Testando componente App', () => {
  test('Testa se a aplicação contém conjunto fixo de links', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: 'Home',
    });

    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });

    expect(aboutLink).toBeInTheDocument();

    const favoritesLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });

    expect(favoritesLink).toBeInTheDocument();
  });
});

test('Teste se a aplicação é redirecionada ao clicar no link "/"', () => {
  const { history } = renderWithRouter(<App />);
  fireEvent.click(screen.getByText('Home'));
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Teste se a aplicação é redirecionada ao clicar no link "/about"', () => {
  const { history } = renderWithRouter(<App />);
  fireEvent.click(screen.getByText('About'));
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('Teste se a aplicação é redirecionada ao clicar no link "/favorites"', () => {
  const { history } = renderWithRouter(<App />);
  fireEvent.click(screen.getByText('Favorite Pokémons'));
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});
