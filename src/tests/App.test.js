import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import RenderWithRouter from './new-test/RenderWithRouter';
import App from '../App';

describe('1. Teste o componente `<App.js />`:', () => {
  it('Existem os respectivos texto "Home" na página:', () => {
    // Acessar elementos da sua tela:
    RenderWithRouter(<App />);
    // Fazer o teste / testes:
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });

  it('Existem o texto "About" na página:', () => {
    // Acessar elementos da sua tela:
    RenderWithRouter(<App />);
    // Fazer o teste / testes:
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
  });

  it('Existem os respectivos texto "Favorite Pokémons" na página:', () => {
    // Acessar elementos da sua tela:
    RenderWithRouter(<App />);
    // Fazer o teste / testes:
    expect(screen.getByRole('link', { name: 'Favorite Pokémons' })).toBeInTheDocument();
  });
});

it('Teste se a aplicação é redirecionada ao clicar no link "/"', () => {
// Acessar elementos da sua tela:
  const { history } = RenderWithRouter(<App />);
  // Interagir com eles (se houver necessidade):
  fireEvent.click(screen.getByText('Home'));
  // Fazer o teste / testes:
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

it('Teste se a aplicação é redirecionada ao clicar no link "/about"', () => {
// Acessar elementos da sua tela:
  const { history } = RenderWithRouter(<App />);
  // Interagir com eles (se houver necessidade):
  fireEvent.click(screen.getByText('About'));
  // Fazer teste / testes:
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

it('Teste se aplicação é direcionada ao clicar no link "/favorites"', () => {
// Acessar elementos da sua tela:
  const { history } = RenderWithRouter(<App />);
  // Interagir com eles (se houver necessidade):
  fireEvent.click(screen.getByText('Favorite Pokémons'));
  // Fazer teste / testes:
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});
