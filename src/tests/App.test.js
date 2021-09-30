import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';

import App from '../App';

describe('Testa o componente App', () => {
  it('Teste se o topo da aplicação contém' // colaboração do colega Matheus Souza
    + ' um conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    expect(aboutLink).toBeInTheDocument();

    const favoritesLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(favoritesLink).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página inicial,'
  + 'na URL / ao clicar no link Home da barra de navegação', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(homeLink);
  });

  it('Teste se a aplicação é redirecionada para a página de About,'
  + ' na URL /about, ao clicar no link About da barra de navegação.', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(aboutLink);
  });

  it('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL'
  + ' /favorites, ao clicar no link Favorite Pokémons da barra de navegação.', () => {
    renderWithRouter(<App />);
    const favoritesLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(favoritesLink);
  });

  it('Teste se a aplicação é redirecionada para a página Not Found'
  + ' ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-inexistente');
    const pageNotFound = screen.getByText(/not found/i);
    expect(pageNotFound).toBeInTheDocument();
  });
});
