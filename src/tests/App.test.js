// test('', () => {});
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testes App.js', () => {
  test('Teste se o topo da aplicação tem um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  test('Teste se a aplicação vai para a página inicial ("/") ao clicar em home', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByText('Home');
    userEvent.click(homeLink);

    expect(history.location.pathname).toBe('/');
  });

  test('Teste se a aplicação vai para a página About (/about) ao clicar em About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByText('About');
    userEvent.click(aboutLink);

    expect(history.location.pathname).toBe('/about');
  });

  test('Verifica se vai para a página /favorites ao clicar em Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);

    const favoritesLink = screen.getByText('Favorite Pokémons');
    userEvent.click(favoritesLink);

    expect(history.location.pathname).toBe('/favorites');
  });

  test('Verifica se vai para a página Not Found ao acessar uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pagina-que/nao-existe');

    expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
