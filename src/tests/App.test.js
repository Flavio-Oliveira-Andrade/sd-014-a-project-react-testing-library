import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Verificando se as rotas estão navegando para os locais corretos', () => {
  test('Página - HOME', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeDefined();
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('Página - About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /About/i });
    expect(aboutLink).toBeDefined();
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test('Página - Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoriteLink).toBeDefined();
    userEvent.click(favoriteLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  test('Página - Not Found, no caso de ser fornecida uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/paginaqualquer');
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
describe('Verificando se os Links possuem os nomes corretos', () => {
  beforeEach(() => renderWithRouter(<App />));
  test('Se o primeiro link da página é \'Home\'', () => {
    const links = screen.getAllByRole('link');
    expect(links[0].innerHTML).toBe('Home');
  });
  test('Se o segundo link da página é \'About\'', () => {
    const links = screen.getAllByRole('link');
    expect(links[1].innerHTML).toBe('About');
  });
  test('Se o terceiro link da página é \'Favorite Pokémons\'', () => {
    const links = screen.getAllByRole('link');
    expect(links[2].innerHTML).toBe('Favorite Pokémons');
  });
});
