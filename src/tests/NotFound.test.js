import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('test NotFound', () => {
  it('should contain a h2 with text', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('should have an image', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
