import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './render/renderWithRouter';
import App from '../App';

describe('01 - Teste o Componte', () => {
  it('Se o link deve possuir o texto home \'home\'', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('Se o link deve possuir o texto About \'About\'', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('Se o link deve possuir o texto Favorite Pokémons \'Favorite Pokémons\'', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  it('Se ao clicar no link Home, redireciona para a url ”/”', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText('Home'));
    expect(history.location.pathname).toBe('/');
  });

  it('Se ao clicar no link About, redireciona para a url ”/about”', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText('About'));
    expect(history.location.pathname).toBe('/about');
  });

  it('Se ao clicar no link Favorite, redireciona para a url ”/favorites”', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText('Favorite Pokémons'));
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Se ao passar uma rota desconnhecida, redireciona para a página ”Not Found”', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/ilanmon');
    expect(screen.getByText('Page requested not found')).toBeInTheDocument();
  });
});
