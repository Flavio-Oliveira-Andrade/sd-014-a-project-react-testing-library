import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from './helper/renderWithRouter';
import NotFound from '../components/NotFound';

describe('NotFound component test', () => {
  test('should contain a heading with the text "Page requested not found 😭"', () => {
    renderWithRouter(<NotFound />);

    const notFoundHeading = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(notFoundHeading).toBeInTheDocument();
  });

  test('should render a specific image URL', () => {
    renderWithRouter(<NotFound />);

    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const notFoundImage = screen.getByRole('img', {
      name: /pikachu crying/i,
    });
    expect(notFoundImage).toBeInTheDocument();
    // https://react-test.dev/#tohaveattribute
    expect(notFoundImage).toHaveAttribute('src', URL);
  });
});
