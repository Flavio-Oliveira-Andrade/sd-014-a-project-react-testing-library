import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
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

describe('tests App.js component', () => {
  it('renders "Home" text on the first link', () => {
    renderWithRouter(<App />);

    const homeText = screen.getByText(/home/i);
    expect(homeText).toBeInTheDocument();
  });

  it('renders "About" text on the first link', () => {
    renderWithRouter(<App />);

    const aboutText = screen.getByText(/about/i);
    expect(aboutText).toBeInTheDocument();
  });

  it('renders "Favorite Pokémons" text on the first link', () => {
    renderWithRouter(<App />);

    const favoritePkmText = screen.getByText(/favorite pokémons/i);
    expect(favoritePkmText).toBeInTheDocument();
  });
});
