import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
// import renderWithRouter from './auxiliary-tools/renderWithRouter';

describe('Not Found page functions properly', () => {
  it('Should display the message \'Page requested not found\' ', () => {
    render(<NotFound />);

    const message = screen.getByRole('heading',
      { name: /Page requested not found/i, level: 2 });

    expect(message).toBeInTheDocument();
  });

  it('Should display an image of a crying Pikachu - very sad.', () => {
    render(<NotFound />);
    const cryingPikachu = screen.getByRole('img',
      { name: /Pikachu crying/i });

    expect(cryingPikachu).toBeInTheDocument();
    expect(cryingPikachu.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
