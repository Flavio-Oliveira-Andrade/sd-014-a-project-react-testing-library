import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testa o componente App.js', () => {
  it('Deveria conter um conjunto de 3 links de navegação no topo da página', () => {
    renderWithRouter(<App />);
    const home = screen.getByText('Home');
    const about = screen.getByText('About');
    const favoritePokemons = screen.getByText('Favorite Pokémons');
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
  });
  it('Deveria redirecionar para a pagina inicial ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText('Home'));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
  it('Deveria redirecionar para a página About (/about) ao clicar no link About', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText('About'));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });
  it('Deveria redirecionar para a página /favorites ao clicar no link Favorite Pokémons',
    () => {
      const { history } = renderWithRouter(<App />);
      userEvent.click(screen.getByText('Favorite Pokémons'));
      const { location: { pathname } } = history;
      expect(pathname).toBe('/favorites');
    });
  it('Deveria redirecionar para a pagina Not Found ao entrar em URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/jordanGOAT23');
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
