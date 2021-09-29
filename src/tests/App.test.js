import React from 'react';
import { screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('1 - Testes do componente App.js', () => {
  renderWithRouter(<App />);
  it('Os links de navegação devem ter nomes Home, About e Favorite Pokémons', () => {
    const homeLink = screen.getByText('Home');
    const aboutLink = screen.getByText('About');
    const favoritePokémonsLink = screen.getByText('Favorite Pokémons');

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritePokémonsLink).toBeInTheDocument();
  });

  it('O link Home deve redirecionar o usuário para /', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByText('Home');

    fireEvent.click(homeLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('O link About deve redirecionar o usuário para /about', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByText('About');

    fireEvent.click(aboutLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  it('O link Favorite Pokémons deve redirecionar o usuário para /favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokémonsLink = screen.getByText('Favorite Pokémons');

    fireEvent.click(favoritePokémonsLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  it('Inserir URL desconhecida deve renderizar uma imagem de página desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/sdfadf');

    const notFoundMessage = screen.getByText(/Page requested not found/i);
    expect(notFoundMessage).toBeInTheDocument();
  });
});
