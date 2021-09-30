import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

describe('Componente App', () => {
  test('renderiza links de navegação', () => {
    renderWithRouter(<App />);
    const navLinks = screen.getAllByRole('link');
    expect(navLinks[0].innerHTML).toBe('Home');
    expect(navLinks[1].innerHTML).toBe('About');
    expect(navLinks[2].innerHTML).toBe('Favorite Pokémons');
  });

  test('redireciona para página About ao clicar no link', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('redireciona para página Favorites ao clicar no link', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('redireciona para página Home ao clicar no link', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('redireciona para página Not Found ao acessar URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/not-a-valid-path');
    const notFoundHeading = screen.getByRole('heading', { name: /not found/i });
    expect(notFoundHeading).toBeInTheDocument();
  });
});
