import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utilitary/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Tests the ABOUT component', () => {
  beforeEach(() => { renderWithRouter(<NotFound />); });

  it('should render Not Found <h2>', () => {
    expect(screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    })).toBeInTheDocument();
  });

  it('should render Not Found <img>', () => {
    expect(screen.getByAltText('Pikachu crying because the page requested was not found'))
      .toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
