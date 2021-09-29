import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';

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

describe('tests FavoritePokemons.js component', () => {
  it('renders the "No favorite pokemon found" text', () => {
    renderWithRouter(<FavoritePokemons />);

    const noFavFound = screen.getByText(/no favorite pokemon found/i);
    expect(noFavFound).toBeInTheDocument();
  });
});
