import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Test <NotFound.js /> component', () => {
  it('should contain a heading (h2) with the following text: '
    + '"Page requested not found"', () => {
    render(<NotFound />);
    const heading = screen.getByRole('heading',
      { name: /Page requested not found/i,
        level: 2,
      });
    expect(heading).toBeInTheDocument();
  });

  it('should have an image (gif)', () => {
    render(<NotFound />);
    const image = screen.getByAltText(/Pikachu crying because the page/);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
