import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test App component', () => {
  it('contains a fixed set of nav links at the top of the app', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favoritePokemon = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritePokemon).toBeInTheDocument();
  });

  it('redirects to homepage by clicking on the Home link', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);
    const homePage = screen.getByRole('heading', {
      name: 'Encountered pokémons',
    });
    expect(homePage).toBeInTheDocument();
  });

  it('redirects to about page by clicking on the About link', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);
    const aboutPage = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(aboutPage).toBeInTheDocument();
  });

  it('redirects to favorites page by clicking on the Favorite link', () => {
    renderWithRouter(<App />);
    const favoritePokemon = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(favoritePokemon);
    const favoritesPage = screen.getByRole('heading', {
      name: 'Favorite pokémons',
    });
    expect(favoritesPage).toBeInTheDocument();
  });

  it('redirects to Not Found page by entering an unknown URL', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/unknown');
    const notFoundPage = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(notFoundPage).toBeInTheDocument();
  });
});
