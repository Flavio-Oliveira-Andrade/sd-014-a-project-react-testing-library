import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente App', () => {
  test('verefica se os links de navegação são fixos', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeInTheDocument();
    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeInTheDocument();
    const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFavorite).toBeInTheDocument();
  });
  test('Teste se é redirecionada para a página inicial, ao clicar no link Home', () => {
    const { history: { location: { pathname } } } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);
    expect(pathname).toBe('/');
  });
  test(`Teste se é é redirecionada para a página de About,
   ao clicar no link About`, () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });
  test(`Teste se é é redirecionada para a página de Favoritados,
       ao clicar no link Favorite Pokémons`, () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavorite);
    expect(history.location.pathname).toBe('/favorites');
  });
});
