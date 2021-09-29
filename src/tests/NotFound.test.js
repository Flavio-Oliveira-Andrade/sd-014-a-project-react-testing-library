import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

test('Teste o componente <NotFound.js />', () => {
  renderWithRouter(<NotFound />);

  const imgLink = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

  expect(
    screen.getByRole('heading', { level: 2 }).textContent,
  ).toBe('Page requested not found 😭');

  expect(
    screen.getAllByRole('img')[1].src,
  ).toBe(imgLink);
});
