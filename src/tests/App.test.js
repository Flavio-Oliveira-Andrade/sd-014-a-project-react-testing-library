import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requisito 1', () => {
  test('O primeiro link deve ter o texto Home, O segundo link deve ter o texto About'
   + 'e o terceiro link deve ter o texto Favorite Pokémons.', () => {
    render(<App />);
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
    history.push('/');
    const aboutLink = screen.getByRole('link', { name: 'About' });
    //  const pokedexText = screen.getByRole('heading', { name: 'Encountered pokémons' });
    //  expect(pokedexText).toBeInTheDocument();
    fireEvent.click(aboutLink);
    const textAbout = screen.getByRole('heading', { name: 'About Pokédex' });
    const atualUrl = history.location.pathname;
    expect(textAbout).toBeInTheDocument();
    //  expect(pokedexText).not.toBeInTheDocument();
    expect(atualUrl).toBe('/about');
  });
  test('A aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.', () => {
    renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    //  const pokedexText = screen.getByRole('heading', { name: 'Encountered pokémons' });
    fireEvent.click(favoriteLink);
    const textFavorite = screen.getByRole('heading', { name: 'Favorite pokémons' });
    expect(textFavorite).toBeInTheDocument();
  });
  test('A aplicação é redirecionada para a página Not Found'
  + 'ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    /*  const pokedexText = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(pokedexText).toBeInTheDocument();  */
  });
});
