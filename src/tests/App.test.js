import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
// import userEvent from '@testing-library/user-event';
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
});
