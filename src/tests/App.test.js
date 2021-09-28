import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

describe('Testa se os links existem e fazem o redirecionamento', () => {
  it('Testa se o primeiro link possui o texto "Home"', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    expect(home).toBeInTheDocument();
  });

  it('Testa se o Home leva para /', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testa se o segundo link possui o texto "About"', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /about/i });
    expect(home).toBeInTheDocument();
  });

  it('Testa se o About leva para /about', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Testa se o primeiro link possui o texto "Favorite Pokémons"', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(home).toBeInTheDocument();
  });

  it('Testa se o Favorite Pokemons leva para /favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favorites = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favorites);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
