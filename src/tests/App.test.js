import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Tests the App component', () => {
  it('should render the nav links Home, About and Favorite Pokemons', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    expect(aboutLink).toBeInTheDocument();

    const favoritePokemonsLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(favoritePokemonsLink).toBeInTheDocument();
  });

  it('redirects to the correct page when corresponding link is clicked', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');

    const favoritePokemonsLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(favoritePokemonsLink).toBeInTheDocument();
    userEvent.click(favoritePokemonsLink);
    expect(history.location.pathname).toBe('/favorites');

    history.push('/foo');
    const proofNotFound = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(proofNotFound).toBeInTheDocument();
  });
});
