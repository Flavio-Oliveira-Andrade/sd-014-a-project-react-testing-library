import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './auxiliary-tools/renderWithRouter';

describe('Topmost part of the App has 3 functioning links for navigation', () => {
  test('1st link should say \'Home\' and take you there', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    const { pathname } = history.location;

    userEvent.click(homeLink);

    expect(homeLink).toBeInTheDocument();
    expect(pathname).toBe('/');
  });

  test('2nd link should say \'About\' and take you there', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /About/i });
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('3rd link should say \'Favorite Pokémons\' and take you there', () => {
    const { history } = renderWithRouter(<App />);
    const favLink = screen.getByRole('link', { name: /Favorite Pokémon/i });

    userEvent.click(favLink);
    expect(favLink).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Non-existent page should redirect to \'Page Not Found\'', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/should-return-not-found');

    const notFound = screen.getByRole('heading',
      { name: /Page requested not found/i, level: 2 });

    expect(notFound).toBeInTheDocument();
  });
});

// ACCESS -> INTERACT -> TEST
