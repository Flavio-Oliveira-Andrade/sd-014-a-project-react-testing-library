import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('should contain h2 with text "Page requested not found 😭"', () => {
  render(
    <NotFound />,
  );
  const notFoundText = screen.getByRole('heading', {
    level: 2,
    name: /page requested not found/i,
  });
  expect(notFoundText).toBeInTheDocument();
});

test('Should appear image', () => {
  render(
    <NotFound />,
  );
  const img = screen.getByRole('img', {
    name: 'Pikachu crying because the page requested was not found',
  });
  expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
