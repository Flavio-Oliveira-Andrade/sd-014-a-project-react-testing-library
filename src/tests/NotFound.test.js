import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Tests the NotFound component', () => {
  it('should render a heading with the not found message', () => {
    renderWithRouter(<NotFound />);

    const message = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(message).toBeInTheDocument();
  });

  it('should render an image of Pikachu', () => {
    renderWithRouter(<NotFound />);

    const sadPikachu = screen.getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i,
    });
    expect(sadPikachu).toBeInTheDocument();
    expect(sadPikachu.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
