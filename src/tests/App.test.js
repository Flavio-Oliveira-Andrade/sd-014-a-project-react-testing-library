import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test App component', () => {
  it('should contain a fixed set of nav links at the top of the app', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favoritePokemon = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritePokemon).toBeInTheDocument();
  });

  it('should redirect to the homepage by clicking on the Home link in the nav bar',
    () => {
      renderWithRouter(<App />);
      const homeLink = screen.getByRole('link', { name: 'Home' });
      fireEvent.click(homeLink);
      expect(screen.getByRole('heading', { name: 'Pokédex' })).toBeInTheDocument();
    });
});
