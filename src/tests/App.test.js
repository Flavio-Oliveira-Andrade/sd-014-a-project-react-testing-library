import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

// https://testing-library.com/docs/example-react-router/#reducing-boilerplate
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

// https://qastack.com.br/programming/508269/how-do-i-break-a-string-across-more-than-one-line-of-code-in-javascript
describe('Testa se o topo da aplicação contém'
  + ' um conjunto fixo de links de navegação.', () => {
  test('Testa se o primeiro link possui o texto'
    + ' "Home" e vai para a pagina especifica', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    expect(homeLink).toBeInTheDocument();
    fireEvent.click(homeLink);

    const homeTitle = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(homeTitle).toBeInTheDocument();
  });

  test('Testa se o segundo link possui o texto "about"'
    + ' e vai para a pagina especifica', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    expect(aboutLink).toBeInTheDocument();
    fireEvent.click(aboutLink);

    const aboutTitle = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(aboutTitle).toBeInTheDocument();
  });

  test('Testa se o terceiro link possui o texto "Favorite Pokémons"'
    + ' e vai para a pagina especifica', () => {
    renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(favoriteLink).toBeInTheDocument();
    fireEvent.click(favoriteLink);

    const favoriteTitle = screen.getByRole('heading', {
      level: 2,
      name: /favorite pokémons/i,
    });
    expect(favoriteTitle).toBeInTheDocument();
  });
});
