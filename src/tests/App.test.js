import React from 'react';
import { screen, within, fireEvent } from '@testing-library/react';

import renderWithRouter from './renderWithRouter';

import App from '../App';
// Obrigado ao Tiago Sathler pelas dicas de testes
// agradecimentos ao Jonathan Ferreira pela ajuda em jest
function headerLink(linkText, headerText) {
  const { history } = renderWithRouter(<App />);

  const link = screen.getByText(linkText);

  fireEvent.click(link);

  const foundText = screen.getByText(headerText);
  const { pathname } = history.location;

  return { foundText, pathname };
}

describe('1 - Testando o App.js', () => {
  test('1.2 - Testa se os três links estão na tela', () => {
    renderWithRouter(<App />);

    const LINK_COUNT = 3;
    const navigation = screen.getByRole('navigation');
    const navLinks = within(navigation).getAllByRole('link');

    expect(navLinks.length).toBe(LINK_COUNT);
    expect(navLinks[0].textContent).toBe('Home');
    expect(navLinks[1].textContent).toBe('About');
    expect(navLinks[2].textContent).toBe('Favorite Pokémons');
  });

  test('1.3- Testa se o link Home funciona corretamente', () => {
    const { foundText, pathname } = headerLink('Home', /^Encountered pokémons$/);

    expect(pathname).toBe('/');
    expect(foundText).toBeInTheDocument();
  });

  test('1.4- Testa se o link About funciona corretamente', () => {
    const { foundText, pathname } = headerLink('About', /^About Pokédex$/);

    expect(pathname).toBe('/about');
    expect(foundText).toBeInTheDocument();
  });

  test('1.5- Testa se o link Favoritos funciona corretamente', () => {
    const { foundText, pathname } = headerLink('Favorite Pokémons',
      /^Favorite pokémons$/);

    expect(pathname).toBe('/favorites');
    expect(foundText).toBeInTheDocument();
  });

  test('1.6- Testa se rotas inexistentes redirecionam ao NotFound', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/agumon');

    const notFound = screen.getByText(/^Page requested not found.*/);

    expect(notFound).toBeInTheDocument();
  });
});
