import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../support/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Tests the ABOUT component', () => {
  beforeEach(() => { renderWithRouter(<NotFound />); });

  it('should have the Not Found heading', () => {
    expect(screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    })).toBeInTheDocument();
  });

  it('should have a Not Found image', () => {
    expect(screen.getByAltText('Pikachu crying because the page requested was not found'))
      .toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
