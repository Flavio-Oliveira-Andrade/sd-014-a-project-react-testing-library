import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('App.js test', () => {
  test('Testa se o topo da aplicação contém um conjunto fixo de links', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toBeInTheDocument();
    const about = screen.getByRole('link', { name: 'About' });
    expect(about).toBeInTheDocument();
    const favoritePkmn = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoritePkmn).toBeInTheDocument();
  });
  test('Testa se existe redirecionamento para home ao clicar no link Home', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    fireEvent.click(home);
    const homeText = screen.getByText('Encountered pokémons');
    expect(homeText).toBeInTheDocument();
  });
  test('Testa se existe redirecionamento para about ao clicar no link About', () => {
    renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: 'About' });
    fireEvent.click(about);
    const aboutText = screen.getByText('About Pokédex');
    expect(aboutText).toBeInTheDocument();
  });
  test('Testa se há redirecionamento para Favoritados, ao clicar em Favorite', () => {
    renderWithRouter(<App />);
    const favoritePkmn = screen.getByText('Favorite Pokémons');
    fireEvent.click(favoritePkmn);
    const favoriteText = screen.getByText('Favorite pokémons');
    expect(favoriteText).toBeInTheDocument();
  });
  test('Testa se há redirecionamento para NotFound ao inserir URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notfound');
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
