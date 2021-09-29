import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Pokedex } from '../components';

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

describe('tests Pokedex.js component', () => {
  it('renders the "Encountered pokémons" heading text', () => {
    renderWithRouter(<Pokedex />);

    const headingText = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(headingText).toBeInTheDocument();
  });
});
