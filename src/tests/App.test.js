import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

const renderApp = () => render(
  <Router history={ createMemoryHistory('/') }>
    <App />
  </Router>,
);

describe('Testes do render App', () => {
  test('teste para verificar se o component App está sendo renderizado', () => {
    renderApp();
  });
  test('verifica se o link "Home" aparece na tela', () => {
    renderApp();
    const home = screen.getByRole('link', { name: /home/i });
    expect(home).toBeInTheDocument();
  });
  test('verifica se o link "About" aparece na tela', () => {
    renderApp();
    const about = screen.getByRole('link', { name: /about/i });
    expect(about).toBeInTheDocument();
  });
  test('verifica se o link "Favorite Pokémons" aparece na tela', () => {
    renderApp();
    const favorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favorite).toBeInTheDocument();
  });
});
