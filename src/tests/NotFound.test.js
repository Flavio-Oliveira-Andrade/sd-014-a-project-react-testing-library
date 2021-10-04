import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Test NotFound component', () => {
  it('contains a heading with text Page requested not found', () => {
    render(<NotFound />);
    const heading = screen.getByText(/Page requested not found/i);
    expect(heading).toBeInTheDocument();
  });

  it('shows an image', () => {
    render(<NotFound />);
    const image = screen.getByRole('img', { name: /Pikachu crying/ });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
