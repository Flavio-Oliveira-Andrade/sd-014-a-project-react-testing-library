import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste do componente App', () => {
  it('Verifica se o topo da aplicação'
    + ' contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    const favoritePokemonsLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoritePokemonsLink).toBeInTheDocument();
  });

  it('Verifica se a aplicação é redirecionada para a página inicial,'
    + ' na URL / ao clicar no link Home da barra de navegação.', () => {
    const { history: { location: { pathname } } } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);
    expect(pathname).toBe('/');
  });

  it('Verifica se a aplicação é redirecionada para a página de About,'
    + ' na URL /about, ao clicar no link About da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  it('Verifica se a aplicação é redirecionada para a página de Pokémons Favoritados,'
    + ' na URL /favorites, ao clicar no link'
    + ' Favorite Pokémons da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemonsLink = screen.getByRole('link',
    { name: 'Favorite Pokémons' });
    userEvent.click(favoritePokemonsLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Verifica se a aplicação é redirecionada para a página'
    + ' Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/anypage');
    const notFoundText = screen.getByText(/not found/i);
    expect(notFoundText).toBeInTheDocument();
  });
});
