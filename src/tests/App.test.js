import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requisito 1', () => {
  it('O primeiro link possui o texto \'Home\'', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('O segundo link deve possuir o texto \'About\'', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('O terceiro link deve possuir o texto \'Favorite Pokémons\'', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  it('Ao clicar no link Home, a URL é redirecionada para ”/”', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText('Home'));
    expect(history.location.pathname).toBe('/');
  });

  it('Ao clicar no link About, a URL é redirecionada para ”/about”', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText('About'));
    expect(history.location.pathname).toBe('/about');
  });

  it('Ao clicar no link Favorite, URL é redirecionada para ”/favorites”', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText('Favorite Pokémons'));
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Ao passar uma rota desconnhecida, a URL é redirecionada para ”/Not Found”', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/ilanmon');
    expect(screen.getByText('Page requested not found')).toBeInTheDocument();
  });
});
