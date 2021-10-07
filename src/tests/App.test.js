import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithReactRoute from './renderWithReactRoute';

describe('Componente App', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithReactRoute(<App />);

    const urlHome = screen.getByText(/Home/i);
    const urlAbout = screen.getByText(/About/i);
    const urlFavorite = screen.getByText(/Favorite Pokémons/i);

    expect(urlHome).toBeInTheDocument();
    expect(urlAbout).toBeInTheDocument();
    expect(urlFavorite).toBeInTheDocument();
  });

  it('Teste se ao clicar no link Home redireciona para a url "/"', () => {
    const { history } = renderWithReactRoute(<App />);
    const urlHome = screen.getByText(/Home/i);
    fireEvent.click(urlHome);
    const pathHome = history.location.pathname;
    expect(pathHome).toBe('/');
  });

  it('Teste se ao clicar no link About redireciona para a url "/about"', () => {
    const { history } = renderWithReactRoute(<App />);
    const urlAbout = screen.getByText(/About/i);
    fireEvent.click(urlAbout);
    const pathAbout = history.location.pathname;
    expect(pathAbout).toBe('/about');
  });

  it('Teste clicar no link Favorite Pokémons redireciona para a url "/favorites"',
    () => {
      const { history } = renderWithReactRoute(<App />);
      const urlFavorites = screen.getByText(/Favorite Pokémons/i);
      fireEvent.click(urlFavorites);
      const pathFavorites = history.location.pathname;
      expect(pathFavorites).toBe('/favorites');
    });

  it('Teste se for passado um URL desconhecido redireciona para a página Not Found',
    () => {
      const { history } = renderWithReactRoute(<App />);
      history.push('/unknown');
      const notFound = screen.getByText('Page requested not found');
      expect(notFound).toBeInTheDocument();
    });
});
