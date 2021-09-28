import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';

import App from '../App';

describe('Componente App', () => {
  it('Contém um conjunto de links com os nomes Home, About e Favorite Pokémons', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByText(/Home/i);
    const linkAbout = screen.getByText(/About/i);
    const linkFavoritePokemons = screen.getByText(/Favorite Pokémons/i);

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokemons).toBeInTheDocument();
  });

  it('Ao clicar no link Home redireciona a página para a url "/"', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByText(/Home/i);
    fireEvent.click(linkHome);
    const pathHome = history.location.pathname;
    expect(pathHome).toBe('/');
  });

  it('Ao clicar no link About redireciona a página para a url "/about"', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByText(/About/i);
    fireEvent.click(linkAbout);
    const pathAbout = history.location.pathname;
    expect(pathAbout).toBe('/about');
  });

  it('Ao clicar no link Favorite Pokémons redireciona a página para a url "/favorites"',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkFavoritePokemons = screen.getByText(/Favorite Pokémons/i);
      fireEvent.click(linkFavoritePokemons);
      const pathFavoritePokemons = history.location.pathname;
      expect(pathFavoritePokemons).toBe('/favorites');
    });

  it('Se for passado um URL desconhecido redireciona para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/unknown');
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
