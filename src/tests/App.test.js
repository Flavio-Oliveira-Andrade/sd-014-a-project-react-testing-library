import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 01', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });
    expect(linkHome).toBeInTheDocument();
    userEvent.click(linkHome);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/');
  });
  it('O segundo link deve possuir o texto About', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });
    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/about');
  });
  it('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavPoke = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(linkFavPoke).toBeInTheDocument();
    userEvent.click(linkFavPoke);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/favorites');
  });
});
