import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/RenderWithRouter';
import App from '../App';

describe('Testa o componente <App.js/>', () => {
  test('Testa se o topo da aplicação contém os links: Home, About e Favorite.', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toBeInTheDocument();
    const about = screen.getByRole('link', { name: 'About' });
    expect(about).toBeInTheDocument();
    const favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favorite).toBeInTheDocument();
  });
  test('Testa se há redirecionamento para a página inicial  ao clicar em Home', () => {
    renderWithRouter(<App />);
  });
  test('Testa se há redirecionamento para a página About, ao clicar em About.', () => {
    renderWithRouter(<App />);
  });
  test('Testa se há redirecionamento para Favoritados, ao clicar em Favorite', () => {
    renderWithRouter(<App />);
  });
  test('Testa se é redirecionado para Not Found ao entrar em URL desconhecida.', () => {
    renderWithRouter(<App />);
  });
});

// alou mundo
