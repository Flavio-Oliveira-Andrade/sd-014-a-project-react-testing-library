import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import NotFound from '../components/NotFound';

test('there a h2 heading with text "Page requested not found"', () => {
  renderWithRouter(<NotFound />);
  const headingPageNotFound = screen.getByRole('heading', {
    name: /requested not found/i,
    level: 2,
  });
  expect(headingPageNotFound).toBeInTheDocument();
});

test('there are pikachu crying img', () => {
  renderWithRouter(<NotFound />);
  const pikachuCrying = screen.getByRole('img', { name: /Pikachu crying/i });
  expect(pikachuCrying.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
