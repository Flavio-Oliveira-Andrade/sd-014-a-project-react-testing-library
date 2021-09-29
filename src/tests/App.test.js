import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const renderWithRouter = (component) => {
  const customHistory = createMemoryHistory();
  const utils = render(
    <Router history={ customHistory }>
      { component }
    </Router>,
  );

  return {
    ...utils,
    history: customHistory,
  };
};

describe('tests App.js', () => {
  it('renders "Home" text on the first link'
  + 'clicks on and renders the Home page', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('renders "About" text on the second link'
  + 'clicks on and renders the About page', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  it('renders "Favorite Pokémons" text on the third link'
  + 'clicks on and renders the Favorite Pokémons page', () => {
    const { history } = renderWithRouter(<App />);

    const favoritePkmLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(favoritePkmLink).toBeInTheDocument();

    userEvent.click(favoritePkmLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  it('renders the Not Found page when unexisting route', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/unexisting-route');

    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
