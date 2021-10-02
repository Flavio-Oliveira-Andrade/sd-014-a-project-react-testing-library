import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('verify correct text for heading', () => {
  render(<NotFound />);
  const h2 = screen.getByRole('heading');

  expect(h2).toHaveTextContent('Page requested not found 😭');
});

test('verify correct image exibition', () => {
  render(<NotFound />);
  const alt = 'Pikachu crying because the page requested was not found';
  const altImg = screen.getByAltText(alt);

  expect(altImg).toBeVisible();
});
