import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../utilities/renderWithRouter';

import App from '../App';

describe('Requisito 01', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('O segundo link deve possuir o texto About',
    () => {
      renderWithRouter(<App />);
      expect(screen.getByText('About')).toBeInTheDocument();
    });

  it('O terceiro link deve possuir o texto Favorite Pokémons',
    () => {
      renderWithRouter(<App />);
      expect(screen.getByText('Favorite Pokémons')).toBeInTheDocument();
    });

  it('Ao clicar no link Home, redireciona para a url ”/”', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText('Home'));
    expect(history.location.pathname).toBe('/');
  });

  it('Ao clicar no link About, redireciona para a url ”/about”', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText('About'));
    expect(history.location.pathname).toBe('/about');
  });

  it('Ao clicar no link Favorite, redireciona para a url ”/favorites”', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText('Favorite Pokémons'));
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Ao passar uma rota desconnhecida, redireciona para a página ”Not Found”', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/ilanmon');
    expect(screen.getByText('Page requested not found')).toBeInTheDocument();
  });
});
