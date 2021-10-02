import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requisito 1', () => {
  it('Testa se o primeiro link possui o texto Home', () => {
    renderWithRouter(<App />);
    const textHome = screen.getByText('Home');
    expect(textHome).toBeInTheDocument();
  });

  it('Testa se o segundo link possui o texto About', () => {
    renderWithRouter(<App />);
    const textAbout = screen.getByText('About');
    expect(textAbout).toBeInTheDocument();
  });

  it('Testa se o terceiro link possui o texto Favorite Pokémons.', () => {
    renderWithRouter(<App />);
    const textFavoritePokemons = screen.getByText('Favorite Pokémons');
    expect(textFavoritePokemons).toBeInTheDocument();
  });

  it('Ao clicar no link Home, redireciona para a url ”/”', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByText('Home');
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  it('Ao clicar no link About, redireciona para a url ”/about”', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByText('About');
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  it('Se ao clicar no link Favorite, redireciona para a url ”/favorites”', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokLink = screen.getByText('Favorite Pokémons');
    userEvent.click(favoritePokLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Ao passar uma rota desconnhecida, redireciona para a página ”Not Found”', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/url-desconhecida');
    expect(screen.getByText('Page requested not found')).toBeInTheDocument();
  });
});
