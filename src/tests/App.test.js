import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../utilities/renderWithRouter';

describe('Testanto os links do componente "App"', () => {
  it('testa se o link link "Home"', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', {
      name: /home/i,
    });

    expect(home).toBeInTheDocument();
    fireEvent.click(home);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/');
  });
  it('testa se o link link "About"', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', {
      name: /about/i,
    });

    expect(about).toBeInTheDocument();
    fireEvent.click(about);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/about');
  });
  it('testa se o link link "Pokémons Favoritados"', () => {
    const { history } = renderWithRouter(<App />);
    const favorites = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });

    expect(favorites).toBeInTheDocument();
    fireEvent.click(favorites);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/favorites');
  });
  // it('testa se um caminho não existe na renderização', () => {
  //   const { history } = renderWithRouter(<App />);
  //   const notFound = history.push('/pagina/que-nao-existe');
  //   expect(notFound).toBe('/pagina/que-nao-existe');
  // });
});
