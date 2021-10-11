import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

describe('App component test', () => {
  test('should the application contains the text '
  + '"Home" in one of the navigation links ', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    expect(homeLink).toBeInTheDocument();
  });

  test('should redirect to "/" when the link "Home" is clicked', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  test('should the application contains the text "About" '
  + 'in one of the navigation links', () => {
    renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    expect(aboutLink).toBeInTheDocument();
  });

  test('should redirect to "/about" when the link "About" is clicked', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  test('should the application contains the text "Favorite Pokémons" '
  + 'in one of the navigation links', () => {
    renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(favoriteLink).toBeInTheDocument();
  });

  test('should redirect to "/favorites" when the link '
  + '"Favorite Pokémons" is clicked', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(favoriteLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('should the application be redirected to the "Not Found" page '
  + 'when entering an unknown URL', () => {
    renderWithRouter(<App />);

    const { history } = renderWithRouter(<App />);
    history.push('/unknown-page');

    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(notFound).toBeInTheDocument();
  });
});
