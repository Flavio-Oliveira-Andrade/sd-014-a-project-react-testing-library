import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RenderWithRouter from '../util/RenderWithRouter';

describe('testando <App />', () => {
  test('existe o link "home", "About" e "Favorite Pokémons"', () => {
    RenderWithRouter(<App />);
    const getHome = screen.getByText('Home');
    const getAbout = screen.getByText('About');
    const getFavoritePokemon = screen.getByText('Favorite Pokémons');

    expect(getHome).toBeInTheDocument();
    expect(getAbout).toBeInTheDocument();
    expect(getFavoritePokemon).toBeInTheDocument();
  });

  test('redirecionando para página ao clicar no Home', () => {
    const { history } = RenderWithRouter(<App />);
    const getHomeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(getHomeLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('redirecionando para página ao clicar no About', () => {
    const { history } = RenderWithRouter(<App />);
    const getAboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(getAboutLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  test('redirecionando para página ao clicar no Favorite Pokémons', () => {
    const { history } = RenderWithRouter(<App />);
    const getFavoritePokLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(getFavoritePokLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  test('redirecionando para página not found se qualquer caminho for digitado', () => {
    const { history } = RenderWithRouter(<App />);
    history.push('/notfound');
    const getNotFoundLink = screen.getByRole('heading', {
      name: /Page requested not found/i,
    });

    const { location: { pathname } } = history;
    expect(getNotFoundLink).toBeInTheDocument();
    expect(pathname).toBe('/notfound');
  });
});
