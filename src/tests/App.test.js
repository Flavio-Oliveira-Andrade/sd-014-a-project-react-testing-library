import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Requirement 1 - App.js', () => {
  test('Checks if Home is rendered in the "/" route', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(screen.getByText(/home/i)).toBeInTheDocument();

    const navigatesToHome = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(navigatesToHome);

    const goesToHomePage = screen.getByRole('heading', {
      name: /pokédex/i,
      level: 1,
    });
    expect(goesToHomePage).toBeInTheDocument();
  });

  test('Checks if About section is rendered in "/about" ', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    expect(screen.getByText(/about/i)).toBeInTheDocument();

    const navigatesToAbout = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(navigatesToAbout);

    const ChecksForAbout = screen.getByRole('heading', {
      name: /about/i,
      level: 2,
      exact: false,
    });
    expect(ChecksForAbout).toBeInTheDocument();
  });

  test('checks if the favorite pokemon page is rendered in "/favorites"', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    expect(screen.getByText(/favorite/i)).toBeInTheDocument();

    const navigatesToFavorites = screen.getByRole('link', {
      name: /favorite/i,
      exact: false,
    });
    userEvent.click(navigatesToFavorites);

    const checkForFavoritePokemonHeading = screen.getByRole('heading', {
      name: /favorite/i,
      level: 2,
      exact: false,
    });
    expect(checkForFavoritePokemonHeading).toBeInTheDocument();
  });

  test('checks if not found page is rendered when route is invalid', () => {
    const historyMock = createMemoryHistory();
    render(
      <Router history={ historyMock }>
        <App />
      </Router>,
    );

    historyMock.push('/invalid-route');

    const invalidHeading = screen.getByRole('heading', {
      name: /not found/i,
      level: 2,
      exact: false,
    });
    expect(invalidHeading).toBeInTheDocument();
  });
});
