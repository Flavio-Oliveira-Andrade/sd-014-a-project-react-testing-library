import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  beforeEach(() => renderWithRouter(<App />));
  test('O primeiro link deve possuir o texto Home', () => {
    const links = screen.getAllByRole('link');
    expect(links[0].innerHTML).toBe('Home');
  });
  test('O segundo link deve possuir o texto About', () => {
    const links = screen.getAllByRole('link');
    expect(links[1].innerHTML).toBe('About');
  });
  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    const links = screen.getAllByRole('link');
    expect(links[2].innerHTML).toBe('Favorite Pokémons');
  });
});

describe('Testando se os redirecionamentos de páginas estão corretos', () => {
  test('vai p/ pág inicial, na URL / ao clicar no Home da barra de nav', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    expect(home).toBeDefined();
    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('vai p/ /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    expect(about).toBeDefined();
    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test('vai para /favorites, ao clicar no link Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokes = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favoritePokes).toBeDefined();
    userEvent.click(favoritePokes);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  test('vai para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');
    const error404 = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(error404).toBeInTheDocument();
  });
});
