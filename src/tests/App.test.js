import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describre('Verificando se as rotas estão navegando para os locais corretos', () => {
  test('Página - HOME', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    userEvent.click(links[0]);
    const { location: { pathName } } = history;
    expect(pathName).toBe('/');
  });
  test('Página - About', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    userEvent.click(links[1]);
    const { location: { pathName } } = history;
    expect(pathName).toBe('/about');
  });
  test('Página - Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    userEvent.click(links[2]);
    const { location: { pathName } } = history;
    expect(pathName).toBe('/favorites');
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
