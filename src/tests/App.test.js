import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requisito 1', () => {
  test('O primeiro link deve ter o texto Home, O segundo link deve ter o texto About'
   + 'e o terceiro link deve ter o texto Favorite Pokémons.', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeInTheDocument();
  });
  test('A aplicação é redirecionada para a página inicial, na URL /'
  + 'ao clicar no link Home da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    fireEvent.click(homeLink);
    const atualUrl = history.location.pathname;
    expect(atualUrl).toBe('/');
  });
  test('A aplicação é redirecionada para a página de About, na URL /about,'
  + 'ao clicar no link About da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const pokedexText = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(pokedexText).toBeInTheDocument();
    const aboutLink = screen.getByRole('link', { name: 'About' });   
    fireEvent.click(aboutLink);
    const atualUrl = history.location.pathname;
    expect(atualUrl).toBe('/about');
  });
  test('A aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    fireEvent.click(favoriteLink);
    const atualUrl = history.location.pathname;
    expect(atualUrl).toBe('/favorites');
  });
  test('A aplicação é redirecionada para a página Not Found'
  + 'ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/naruto');
    const notFoundText = screen.getByAltText('Pikachu crying because the page requested was not found');
    expect(notFoundText).toBeInTheDocument();
  });
});
