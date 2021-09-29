import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

describe('Testa o component <App />:', () => {
  it('se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const arrOfNames = ['Home', 'About', 'Favorite Pokémons'];
    renderWithRouter(<App />);
    arrOfNames.forEach((n4me) => {
      const link = screen.getByRole('link', {
        name: n4me,
      });
      expect(link).toBeInTheDocument();
    });
  });

  it('se há redirecionamento para a página inicial, ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('se há redirecionamento para a página "/about" ao clicar no link About', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('se redireciona para "/favorites" ao clicar no link Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('se redireciona para a page Not Found ao ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/nao-existente');
    const noMatch = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(noMatch).toBeInTheDocument();
  });
});
