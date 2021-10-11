import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente App', () => {
  it('Teste se há um conjunto de nav links', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favoritePokemon = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritePokemon).toBeInTheDocument();
  });
  it('Teste se a aplicação é redirecionada para a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    const { pathname } = history.location; //  verifica se estamos na página correta
    fireEvent.click(homeLink);

    expect(pathname).toBe('/');
  });

  it('Teste se a aplicação é redirecionada para a página About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /About/i });
    fireEvent.click(aboutLink);
    const { pathname } = history.location; //  verifica se estamos na página correta

    expect(pathname).toBe('/about');
  });

  it('Teste se a aplicação é redirecionada para a página Favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemon = screen.getByRole('link', { name: 'Favorite Pokémons' });
    fireEvent.click(favoritePokemon);
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });
  it('Teste se a aplicação é redirecionada para a página NotFound', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/inexistente/');
    // history.push passamos como argumento algum link que não
    // existe dentro de nossa aplicação
    const NotFound = screen.getByText(/Page requested not found/i);
    expect(NotFound).toBeInTheDocument();
  });
});
