import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test App component', () => {
  it('should contain a fixed set of nav links at the top of the app', () => {
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

  it('should redirect to homepage by clicking on the Home link', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    fireEvent.click(homeLink);
    expect(
      screen.getByRole('heading', { name: 'Encountered pokémons' }),
    ).toBeInTheDocument();
  });

  it('should redirect to about page by clicking on the About link', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    fireEvent.click(aboutLink);
    expect(
      screen.getByRole('heading', { name: 'About Pokédex' }),
    ).toBeInTheDocument();
  });

  it('should redirect to favorites page by clicking on the Favorite link', () => {
    renderWithRouter(<App />);
    const favoritePokemon = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    fireEvent.click(favoritePokemon);
    expect(
      screen.getByRole('heading', { name: 'Favorite pokémons' }),
    ).toBeInTheDocument();
  });
});
