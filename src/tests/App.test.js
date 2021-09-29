import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import App from '../App';

// veja https://testing-library.com/docs/example-react-router/#reducing-boilerplate
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
};

describe('1. Teste o componente <App.js />', () => {
  test('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  test('A aplicação é redirecionnada para a página inicial', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /Home/i });
    userEvent.click(homeLink);

    const h2 = screen.getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });

  test('A aplicação é redirecionnada para a página de About', () => {
    renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /About/i });
    userEvent.click(aboutLink);

    const h2 = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });

  test('A aplicação é redirecionnada para a página de Pokémons Favoritados', () => {
    renderWithRouter(<App />);

    const favoritesLink = screen.getByRole('link', { name: /Favorite pokémons/i });
    userEvent.click(favoritesLink);

    const h2 = screen.getByRole('heading', { name: /Favorite pokémons/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });

  test('A aplicação é redirecionnada para página Not Found com URL desconhecida', () => {
    renderWithRouter(<App />, { route: '/url-desconhecida' });

    const h2 = screen.getByRole(
      'heading',
      { name: /Page requested not found/i, level: 2 },
    );
    expect(h2).toBeInTheDocument();
  });
});
