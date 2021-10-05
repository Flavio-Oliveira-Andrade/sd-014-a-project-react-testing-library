import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Test <App /> component', () => {
  it('should contain a fixed set of navigation links', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    const aboutLink = screen.getByRole('link', { name: /About/i });
    const favoritePokemonsLink = screen.getByRole('link', { name: /Favorite Pokémons/i });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritePokemonsLink).toBeInTheDocument();
  });

  it('should go to the homepage by clicking on the Home link in the nav bar', () => {
    const { history } = renderWithRouter(<App />);
    const { location: { pathname } } = history;
    const homeLink = screen.getByRole('link', { name: /Home/i });

    userEvent.click(homeLink);

    const encounteredPokemons = screen.getByRole('heading',
      { name: /Encountered pokémons/i,
        level: 2,
      });

    expect(pathname).toBe('/');
    expect(encounteredPokemons).toBeInTheDocument();
  });

  it('should go to the About page by clicking on the About link in the nav bar', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /About/i });

    userEvent.click(aboutLink);

    const { location: { pathname } } = history;
    const aboutPokedex = screen.getByRole('heading',
      { name: /About Pokédex/i,
        level: 2,
      });

    expect(pathname).toBe('/about');
    expect(aboutPokedex).toBeInTheDocument();
  });

  it('should redirect to favorites page by clicking on the Favorite link', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemonsLink = screen.getByRole('link', { name: /Favorite Pokémons/i });

    userEvent.click(favoritePokemonsLink);

    const { location: { pathname } } = history;
    const favoritePokemons = screen.getByRole('heading',
      { name: /Favorite/i,
        level: 2,
      });

    expect(pathname).toBe('/favorites');
    expect(favoritePokemons).toBeInTheDocument();
  });

  it('should go to Not Found page by entering an unknown URL', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/an-unknown-url');

    const notFoundElement = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });

    expect(notFoundElement).toBeInTheDocument();
  });
});
