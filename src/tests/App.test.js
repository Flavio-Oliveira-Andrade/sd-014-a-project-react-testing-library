import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Requisito 1, testa o App.js', () => {
  it('Testa se o app contém um conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />);
    const home = screen.getByText(/home/i);
    const about = screen.getByText(/about/i);
    const favorites = screen.getByText(/favorite pokémons/i);

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorites).toBeInTheDocument();
  });

  it('Testa se a aplicação é redirecionada para a página inicial,'
    + 'na URL "/" ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const homeText = screen.getByText(/home/i);
    userEvent.click(homeText);

    const homeLink = history.location.pathname;
    expect(homeLink).toBe('/');
  });

  it('Testa se a aplicação é redirecionada para a página de About, na URL /about,'
    + 'ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const aboutText = screen.getByText(/about/i);
    userEvent.click(aboutText);

    const aboutLink = history.location.pathname;
    expect(aboutLink).toBe('/about');
  });

  it('Testa se a aplicação é redirecionada para a página de Pokémons Favoritados,'
    + 'na URL /favorites, ao clicar no link Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const favsText = screen.getByText(/favorite pokémons/i);
    userEvent.click(favsText);

    const favsLink = history.location.pathname;
    expect(favsLink).toBe('/favorites');
  });

  it('Teste se a aplicação é redirecionada para a página'
    + 'Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/undefined-route');
    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
