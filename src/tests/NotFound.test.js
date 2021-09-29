import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

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

describe('tests NotFound.js component', () => {
  it('renders a "Page requested not found" text', () => {
    renderWithRouter(<NotFound />);

    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(notFoundText).toBeInTheDocument();

    const pkmImage = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(pkmImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
